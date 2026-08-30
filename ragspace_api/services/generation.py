from django.conf import settings
from .embeddings import get_openai_client


def build_context(retrieved_chunks):
    context_parts = []

    for item in retrieved_chunks:
        point = item["point"]

        filename = point.payload["original_filename"]
        page_number = point.payload["page_number"]
        chunk_text = point.payload["chunk_text"]

        context_parts.append(
            f"""
SOURCE:
File: {filename}
Page: {page_number}

CONTENT:
{chunk_text}
""".strip()
        )

    return "\n\n---\n\n".join(context_parts)


def generate_answer(question, retrieved_chunks):
    if not retrieved_chunks:
        return {
            "answer": "There is not enough information in this Space to answer that question.",
            "sources": [],
        }

    client = get_openai_client()

    context = build_context(retrieved_chunks)

    response = client.responses.create(
        model=settings.RAG_GENERATION_MODEL,
        instructions=(
            "You are the answer-generation component of RAGspace. "
            "Answer the user's question using only the supplied document context. "
            "Do not invent facts that are not supported by the context. "
            "If the context is insufficient, clearly say that the available documents "
            "do not contain enough information to answer the question."
        ),
        input=f"""
QUESTION:
{question}

DOCUMENT CONTEXT:
{context}
""".strip(),
    )

    sources = []

    for item in retrieved_chunks:
        point = item["point"]

        source = {
            "document_id": point.payload["document_id"],
            "filename": point.payload["original_filename"],
            "page_number": point.payload["page_number"],
            "chunk_index": point.payload["chunk_index"],
        }

        if source not in sources:
            sources.append(source)

    return {
        "answer": response.output_text,
        "sources": sources,
    }