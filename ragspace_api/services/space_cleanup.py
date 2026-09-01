from django.db import transaction

from ragspace_api.models import (
    KnowledgeBase,
    Document,
)

from ragspace_api.services.vector_store import (
    delete_document_chunks,
)

from ragspace_api.services.s3_service import (
    delete_document_file,
)


def delete_knowledge_base(
    knowledge_base: KnowledgeBase,
):
    documents = list(
        Document.objects.filter(
            knowledge_base=knowledge_base,
        )
    )

    # Step 1:
    # Clean up every Document externally.
    for document in documents:

        # Delete all Qdrant vectors.
        delete_document_chunks(
            document
        )

        # Delete original PDF from S3.
        delete_document_file(
            document.s3_key
        )

    # Step 2:
    # Delete the KnowledgeBase only after all
    # external cleanup has succeeded.
    #
    # Related database rows should be removed
    # through Django CASCADE relationships.
    with transaction.atomic():
        knowledge_base.delete()