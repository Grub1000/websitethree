from django.conf import settings
from qdrant_client import models

from .embeddings import get_openai_client
from .vector_store import get_qdrant_client
from .reranker import rerank_chunks


def embed_query(query):
    if not query.strip():
        raise ValueError("Query cannot be empty.")

    client = get_openai_client()

    response = client.embeddings.create(
        model=settings.RAG_EMBEDDING_MODEL,
        input=query,
    )

    return response.data[0].embedding


def retrieve_chunks(query, user_id, knowledge_base_id):
    query_vector = embed_query(query)

    qdrant = get_qdrant_client()

    results = qdrant.query_points(
        collection_name=settings.RAG_QDRANT_COLLECTION,
        query=query_vector,
        query_filter=models.Filter(
            must=[
                models.FieldCondition(
                    key="user_id",
                    match=models.MatchValue(value=user_id),
                ),
                models.FieldCondition(
                    key="knowledge_base_id",
                    match=models.MatchValue(value=knowledge_base_id),
                ),
            ]
        ),
        limit=settings.RAG_CANDIDATE_K,
        with_payload=True,
    )

    filtered_results = [
        result
        for result in results.points
        if result.score >= settings.RAG_SCORE_THRESHOLD
    ]

    if not filtered_results:
        return []

    if settings.RAG_RERANKING_ENABLED:
        try:
            reranked_results = rerank_chunks(
                query=query,
                candidates=filtered_results,
            )

            return reranked_results

        except Exception as e:
            print("RAGspace reranking error:", repr(e))

    return [
        {
            "point": result,
            "rerank_score": None,
        }
        for result in filtered_results[:settings.RAG_FINAL_K]
    ]