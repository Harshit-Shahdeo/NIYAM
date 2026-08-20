from pathlib import Path

from pypdf import PdfReader



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


def chunk_text(
    text: str,
    chunk_size: int = 1200,
    overlap: int = 200,
) -> list[str]:
    chunks = []

    start = 0

    while start < len(text):
        end = min(
            start + chunk_size,
            len(text),
        )

        if end < len(text):
            boundary = text.rfind(
                "\n",
                start,
                end,
            )

            if boundary > start + (chunk_size // 2):
                end = boundary

        chunk = text[start:end].strip()

        if chunk:
            chunks.append(chunk)

        # Stop after processing the final chunk
        if end == len(text):
            break

        start = end - overlap

    return chunks


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

    print("Splitting document into chunks...")

    chunks = chunk_text(
        text,
    )

    print(f"Created {len(chunks)} chunks.")

    for index, chunk in enumerate(chunks):
        print(
            f"Processing chunk {index + 1}/{len(chunks)}..."
        )

        embedding = generate_embedding(
            chunk,
        )

        store_policy_chunk(
            document_id=document_id,
            content=chunk,
            embedding=embedding,
            metadata={
                "chunk_index": index,
                "source": Path(pdf_path).name,
            },
        )

    print("Policy ingestion completed.")