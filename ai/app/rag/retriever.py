from app.rag.embeddings import generate_embedding
from app.rag.repository import search_similar_chunks


def retrieve_relevant_policies(
    query: str,
    limit: int = 5,
) -> list[dict]:
    query_embedding = generate_embedding(
        query,
    )

    return search_similar_chunks(
        query_embedding,
        limit,
    )