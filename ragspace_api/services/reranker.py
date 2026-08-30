import voyageai
from django.conf import settings


def get_voyage_client():
    return voyageai.Client(
        api_key=settings.VOYAGE_API_KEY
    )


def rerank_chunks(query, candidates):
    if not candidates:
        return []

    client = get_voyage_client()

    documents = [
        candidate.payload["chunk_text"]
        for candidate in candidates
    ]

    response = client.rerank(
        query=query,
        documents=documents,
        model=settings.RAG_RERANK_MODEL,
        top_k=min(
            settings.RAG_FINAL_K,
            len(documents),
        ),
    )

    reranked = []

    for result in response.results:
        candidate = candidates[result.index]

        reranked.append(
            {
                "point": candidate,
                "rerank_score": result.relevance_score,
            }
        )

    return reranked