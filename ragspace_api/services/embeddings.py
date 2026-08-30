from django.conf import settings
from openai import OpenAI


def get_openai_client():
    return OpenAI(
        api_key=settings.OPENAI_API_KEY
    )


def embed_chunks(chunks):
    if not chunks:
        return []

    client = get_openai_client()

    texts = [
        chunk["text"]
        for chunk in chunks
    ]

    response = client.embeddings.create(
        model=settings.RAG_EMBEDDING_MODEL,
        input=texts,
    )

    embedded_chunks = []

    for chunk, embedding_data in zip(chunks, response.data):
        embedded_chunks.append(
            {
                **chunk,
                "embedding": embedding_data.embedding,
            }
        )

    return embedded_chunks