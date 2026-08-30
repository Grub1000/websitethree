import tiktoken
from django.conf import settings


def chunk_pages(pages):
    encoding = tiktoken.get_encoding("cl100k_base")

    chunk_size = getattr(settings, "RAG_CHUNK_SIZE", 600)
    chunk_overlap = getattr(settings, "RAG_CHUNK_OVERLAP", 120)

    if chunk_overlap >= chunk_size:
        raise ValueError("Chunk overlap must be smaller than chunk size.")

    chunks = []
    chunk_index = 0

    for page in pages:
        page_number = page["page_number"]
        text = page["text"].strip()

        if not text:
            continue

        tokens = encoding.encode(text)

        start = 0

        while start < len(tokens):
            end = min(start + chunk_size, len(tokens))

            chunk_tokens = tokens[start:end]
            chunk_text = encoding.decode(chunk_tokens).strip()

            if chunk_text:
                chunks.append(
                    {
                        "chunk_index": chunk_index,
                        "page_number": page_number,
                        "text": chunk_text,
                        "token_count": len(chunk_tokens),
                    }
                )

                chunk_index += 1

            if end >= len(tokens):
                break

            start = end - chunk_overlap

    return chunks