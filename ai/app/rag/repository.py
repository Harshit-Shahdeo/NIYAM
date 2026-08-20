import json
from uuid import uuid4

from app.rag.database import get_connection


def store_policy_chunk(
    document_id: str,
    content: str,
    embedding: list[float],
    metadata: dict | None = None,
) -> str:
    chunk_id = str(uuid4())

    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO "PolicyChunk" (
                    id,
                    "documentId",
                    content,
                    embedding,
                    metadata
                )
                VALUES (
                    %s,
                    %s,
                    %s,
                    %s::vector,
                    %s::jsonb
                )
                """,
                (
                    chunk_id,
                    document_id,
                    content,
                    str(embedding),
                    json.dumps(metadata or {}),
                ),
            )

        conn.commit()

    return chunk_id

def search_similar_chunks(
    query_embedding: list[float],
    limit: int = 5,
) -> list[dict]:
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT
                    id,
                    "documentId",
                    content,
                    metadata,
                    1 - (embedding <=> %s::vector) AS similarity
                FROM "PolicyChunk"
                ORDER BY embedding <=> %s::vector
                LIMIT %s
                """,
                (
                    str(query_embedding),
                    str(query_embedding),
                    limit,
                ),
            )

            rows = cur.fetchall()

    return [
        {
            "id": row[0],
            "document_id": row[1],
            "content": row[2],
            "metadata": row[3],
            "similarity": float(row[4]),
        }
        for row in rows
    ]    