from pathlib import Path

from pypdf import PdfReader

from app.rag.chunker import chunk_policies


def extract_text_from_pdf(
    pdf_path: str,
) -> str:
    reader = PdfReader(pdf_path)

    pages = []

    for page in reader.pages:
        text = page.extract_text()

        if text:
            pages.append(text)

    return "\n".join(pages)


def ingest_policy_document(
    pdf_path: str,
    document_id: str,
) -> None:
    from app.rag.embeddings import generate_embedding
    from app.rag.repository import store_policy_chunk

    print("Extracting text from PDF...")

    text = extract_text_from_pdf(
        pdf_path,
    )

    print("Splitting document into policies...")

    policies = chunk_policies(text)

    print(f"Found {len(policies)} policies.")

    for index, policy in enumerate(policies, 1):
        print(
            f"Processing policy {index}/{len(policies)}: "
            f"{policy['policy_id']}"
        )

        embedding = generate_embedding(
            policy["content"],
        )

        store_policy_chunk(
            document_id=document_id,
            content=policy["content"],
            embedding=embedding,
            metadata={
                "policy_id": policy["policy_id"],
                "source": Path(pdf_path).name,
            },
        )

    print("Policy ingestion completed.")