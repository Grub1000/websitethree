from django.conf import settings
from qdrant_client import QdrantClient, models
import uuid


def get_qdrant_client():
    return QdrantClient(
        url=settings.QDRANT_URL,
        api_key=settings.QDRANT_API_KEY,
    )


def ensure_collection():
    client = get_qdrant_client()

    collection_name = settings.RAG_QDRANT_COLLECTION

    if not client.collection_exists(collection_name):
        client.create_collection(
            collection_name=collection_name,
            vectors_config=models.VectorParams(
                size=settings.RAG_EMBEDDING_DIMENSIONS,
                distance=models.Distance.COSINE,
            ),
        )

    client.create_payload_index(
        collection_name=collection_name,
        field_name="user_id",
        field_schema=models.PayloadSchemaType.INTEGER,
    )

    client.create_payload_index(
        collection_name=collection_name,
        field_name="knowledge_base_id",
        field_schema=models.PayloadSchemaType.INTEGER,
    )

    client.create_payload_index(
        collection_name=collection_name,
        field_name="document_id",
        field_schema=models.PayloadSchemaType.INTEGER,
    )

    return client


def store_document_chunks(document, embedded_chunks):
    if not embedded_chunks:
        raise ValueError("No embedded chunks were provided.")

    client = ensure_collection()

    points = []

    for chunk in embedded_chunks:
        point_id = str(
            uuid.uuid5(
                uuid.NAMESPACE_URL,
                f"ragspace:{document.id}:{chunk['chunk_index']}",
            )
        )

        points.append(
            models.PointStruct(
                id=point_id,
                vector=chunk["embedding"],
                payload={
                    "user_id": document.user_id,
                    "knowledge_base_id": document.knowledge_base_id,
                    "document_id": document.id,
                    "original_filename": document.filename,
                    "page_number": chunk["page_number"],
                    "chunk_index": chunk["chunk_index"],
                    "chunk_text": chunk["text"],
                    "token_count": chunk["token_count"],
                },
            )
        )

    client.upsert(
        collection_name=settings.RAG_QDRANT_COLLECTION,
        points=points,
        wait=True,
    )

    return len(points)