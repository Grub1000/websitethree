from django.conf import settings

from .embeddings import get_openai_client


def contextualize_query(question, conversation):
    """
    Converts a potentially context-dependent user question into a
    standalone retrieval query using recent conversation history.

    The returned query is used for document retrieval only.
    The user's original question remains unchanged for answer generation.
    """

    # Get the most recent conversation messages.
    #
    # We order newest-first so the database only needs to return the
    # configured number of messages instead of loading the entire history.
    recent_messages = list(
        conversation.messages
        .order_by("-created_at")[:settings.RAG_HISTORY_MESSAGE_LIMIT]
    )

    # Reverse them back into normal chronological order before sending
    # them to the model.
    recent_messages.reverse()

    # No history means the question is already effectively standalone.
    # This also avoids making an unnecessary OpenAI API request for the
    # first message in a conversation.
    if not recent_messages:
        return question

    history = "\n".join(
        f"{message.role}: {message.content}"
        for message in recent_messages
    )

    client = get_openai_client()

    response = client.responses.create(
        model=settings.RAG_CONTEXTUALIZATION_MODEL,
        instructions=(
            "Rewrite the user's latest question as a standalone search query "
            "using the provided conversation history. "
            "Resolve pronouns and references using the conversation history. "
            "Preserve the user's original intent. "
            "Do not answer the question. "
            "Do not add information that is not present in the conversation. "
            "Return only the rewritten standalone query."
        ),
        input=f"""
CONVERSATION HISTORY:
{history}

LATEST QUESTION:
{question}
""".strip(),
    )

    rewritten_query = response.output_text.strip()

    return rewritten_query or question