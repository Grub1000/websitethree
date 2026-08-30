# Imports Needed For Multiple Views
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response


# Imports Needed for KnowledgeBase ViewSet
from .models import KnowledgeBase
from .serializers import KnowledgeBaseSerializer


# Imports Needed for Document ViewSet
from .models import Document
from .serializers import DocumentSerializer
from rest_framework.decorators import action
from .services.s3_service import (
    generate_presigned_upload,
    verify_uploaded_object,
)
from .services.text_extraction import extract_pdf_text
from .services.chunking import chunk_pages
from .services.embeddings import embed_chunks
from .services.vector_store import store_document_chunks
from .services.vector_store import delete_document_chunks
from .services.s3_service import delete_document_file


# Imports Needed for AskSpaceView
from rest_framework.views import APIView
from .services.retrieval import retrieve_chunks
from .services.generation import generate_answer
from django.db import transaction
from .services.query_contextualization import contextualize_query


# Imports Needed For Conversation Viewset
from .models import Conversation, Message
from .serializers import (
    ConversationSerializer,
    MessageSerializer,
)




class KnowledgeBaseViewSet(viewsets.ModelViewSet):
    serializer_class = KnowledgeBaseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return KnowledgeBase.objects.filter(
            user=self.request.user
        ).order_by("-updated_at")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)










class DocumentViewSet(viewsets.ModelViewSet):
    serializer_class = DocumentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return (
            Document.objects
            .filter(user=self.request.user)
            .select_related("knowledge_base")
            .order_by("-created_at")
        )

    @action(detail=False, methods=["post"])
    def presign(self, request):
        knowledge_base_id = request.data.get("knowledge_base")
        filename = request.data.get("filename")
        content_type = request.data.get("content_type")
        file_size = request.data.get("file_size")

        if not all([
            knowledge_base_id,
            filename,
            content_type,
            file_size,
        ]):
            return Response(
                {"detail": "Missing required upload information."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            file_size = int(file_size)
        except (TypeError, ValueError):
            return Response(
                {"detail": "Invalid file size."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if file_size > 10 * 1024 * 1024:
            return Response(
                {"detail": "PDF files cannot exceed 10 MB."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not filename.lower().endswith(".pdf"):
            return Response(
                {"detail": "Only PDF files are supported."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if content_type != "application/pdf":
            return Response(
                {"detail": "Invalid content type."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            knowledge_base = KnowledgeBase.objects.get(
                id=knowledge_base_id,
                user=request.user,
            )
        except KnowledgeBase.DoesNotExist:
            return Response(
                {"detail": "Space not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        presigned = generate_presigned_upload(
            user_id=request.user.id,
            knowledge_base_id=knowledge_base.id,
            filename=filename,
            content_type=content_type,
        )

        document = Document.objects.create(
            user=request.user,
            knowledge_base=knowledge_base,
            filename=filename,
            s3_key=presigned["s3_key"],
            file_size=file_size,
            status=Document.Status.UPLOADING,
        )

        return Response(
            {
                "document_id": document.id,
                "upload_url": presigned["upload_url"],
                "s3_key": document.s3_key,
            },
            status=status.HTTP_201_CREATED,
        )

    @action(detail=True, methods=["post"])
    def complete(self, request, pk=None):
        document = self.get_object()

        try:
            s3_object = verify_uploaded_object(document.s3_key)
        except Exception:
            return Response(
                {"detail": "Uploaded file could not be verified in S3."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        actual_size = s3_object["ContentLength"]

        if actual_size != document.file_size:
            document.status = Document.Status.FAILED
            document.save(update_fields=["status", "updated_at"])

            return Response(
                {"detail": "Uploaded file size does not match expected size."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        actual_content_type = s3_object.get("ContentType")

        if actual_content_type != "application/pdf":
            document.status = Document.Status.FAILED
            document.save(update_fields=["status", "updated_at"])

            return Response(
                {"detail": "Uploaded file is not a PDF."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        document.status = Document.Status.PROCESSING
        document.save(update_fields=["status", "updated_at"])

        try:
            # Extract PDF text
            extraction = extract_pdf_text(document.s3_key)

            document.page_count = extraction["page_count"]
            document.save(update_fields=["page_count", "updated_at"])

            # Split extracted pages into chunks
            chunks = chunk_pages(extraction["pages"])

            # Generate embeddings
            document.status = Document.Status.EMBEDDING
            document.save(update_fields=["status", "updated_at"])

            embedded_chunks = embed_chunks(chunks)

            # Store vectors + metadata in Qdrant
            stored_count = store_document_chunks(
                document,
                embedded_chunks,
            )

            # Entire ingestion pipeline succeeded
            document.status = Document.Status.READY
            document.save(update_fields=["status", "updated_at"])

            print("Generated chunks:", len(chunks))
            print("Generated embeddings:", len(embedded_chunks))
            print("Stored Qdrant points:", stored_count)

        except Exception as e:
            print("RAGspace processing error:", repr(e))

            document.status = Document.Status.FAILED
            document.save(update_fields=["status", "updated_at"])

            return Response(
                {"detail": "PDF processing failed."},
                status=status.HTTP_400_BAD_REQUEST,
            )


        

        return Response(
            self.get_serializer(document).data,
            status=status.HTTP_200_OK,
        )
    def destroy(self, request, *args, **kwargs):
        # self.get_object() uses the ViewSet queryset, so the document
        # must belong to the authenticated user.
        document = self.get_object()

        try:
            # Step 1:
            # Delete all indexed chunks from Qdrant first.
            #
            # This is intentionally done before deleting the MySQL record.
            # If Qdrant cleanup fails, we keep the Document row so we still
            # have the metadata needed to retry cleanup later.
            delete_document_chunks(document)

            # Step 2:
            # Delete the original PDF from S3.
            #
            # Again, the MySQL record is still preserved at this point in
            # case external storage cleanup fails.
            delete_document_file(document.s3_key)

            # Step 3:
            # Only delete the MySQL Document after both external resources
            # have been successfully cleaned up.
            document.delete()

            return Response(
                status=status.HTTP_204_NO_CONTENT,
            )

        except Exception as e:
            print("RAGspace document deletion error:", repr(e))

            return Response(
                {
                    "detail": (
                        "Unable to fully delete the document. "
                        "The document record was preserved."
                    )
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )














class AskSpaceView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        knowledge_base_id = request.data.get("knowledge_base")
        conversation_id = request.data.get("conversation")
        question = request.data.get("question", "").strip()

        if not knowledge_base_id:
            return Response(
                {"detail": "knowledge_base is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not question:
            return Response(
                {"detail": "question is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            knowledge_base = KnowledgeBase.objects.get(
                id=knowledge_base_id,
                user=request.user,
            )
        except KnowledgeBase.DoesNotExist:
            return Response(
                {"detail": "Space not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Tracks whether this request created a new conversation.
        # If the RAG pipeline fails later, we can safely remove that
        # empty conversation instead of leaving unused records behind.
        conversation_created = False

        if conversation_id:
            try:
                conversation = Conversation.objects.get(
                    id=conversation_id,
                    user=request.user,
                    knowledge_base=knowledge_base,
                )
            except Conversation.DoesNotExist:
                return Response(
                    {"detail": "Conversation not found."},
                    status=status.HTTP_404_NOT_FOUND,
                )

        else:
            # Automatically create a conversation for the first question.
            conversation = Conversation.objects.create(
                user=request.user,
                knowledge_base=knowledge_base,
                title=question[:150],
            )

            conversation_created = True

        try:
            # Step 1:
            # Rewrite context-dependent follow-up questions into a
            # standalone query for retrieval.
            retrieval_query = contextualize_query(
                question=question,
                conversation=conversation,
            )

            # Step 2:
            # Retrieve relevant chunks from the selected Space.
            retrieved_chunks = retrieve_chunks(
                query=retrieval_query,
                user_id=request.user.id,
                knowledge_base_id=knowledge_base.id,
            )

            # Step 3:
            # Generate the grounded answer using the user's original
            # question and the retrieved document context.
            result = generate_answer(
                question=question,
                retrieved_chunks=retrieved_chunks,
            )

            # print(retrieval_query)
            # print(question)
            
            # Step 4:
            # Only save the USER and ASSISTANT messages after the
            # complete RAG pipeline succeeds.
            #
            # Both messages are written atomically so either both are
            # committed or neither is.
            with transaction.atomic():
                user_message = Message.objects.create(
                    conversation=conversation,
                    role=Message.Role.USER,
                    content=question,
                )

                assistant_message = Message.objects.create(
                    conversation=conversation,
                    role=Message.Role.ASSISTANT,
                    content=result["answer"],
                    sources=result["sources"],
                )

            return Response(
                {
                    "knowledge_base": knowledge_base.id,
                    "conversation": conversation.id,
                    "user_message": user_message.id,
                    "assistant_message": assistant_message.id,
                    "question": question,
                    "answer": result["answer"],
                    "sources": result["sources"],
                },
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            print("RAGspace question error:", repr(e))

            # If this request automatically created the conversation but
            # retrieval, generation, or message persistence failed, delete
            # that new conversation so we do not leave an empty record.
            #
            # Existing conversations are never deleted by a failed question.
            if conversation_created:
                try:
                    conversation.delete()
                except Exception as cleanup_error:
                    print(
                        "RAGspace conversation cleanup error:",
                        repr(cleanup_error),
                    )

            return Response(
                {"detail": "Unable to answer the question."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )




class ConversationViewSet(viewsets.ModelViewSet):
    serializer_class = ConversationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return (
            Conversation.objects
            .filter(user=self.request.user)
            .order_by("-updated_at")
        )

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=["get"])
    def messages(self, request, pk=None):
        conversation = self.get_object()

        messages = conversation.messages.order_by("created_at")

        serializer = MessageSerializer(
            messages,
            many=True,
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )