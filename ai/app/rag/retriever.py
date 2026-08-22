from app.rag.embeddings import generate_embedding
from app.rag.repository import search_similar_chunks


def retrieve_relevant_policies(
    query: str,
    limit: int = 10, 
    threshold: float = 0.25,
) -> list[dict]:

    query_embedding = generate_embedding(query)

    results = search_similar_chunks(
        query_embedding,
        limit,
    )

    filtered_results = [
        result
        for result in results
        if result["similarity"] >= threshold
    ]

    return filtered_results