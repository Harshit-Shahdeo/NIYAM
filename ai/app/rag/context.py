def build_policy_context(results: list[dict]) -> str:
    if not results:
        return "No relevant institutional policies were found."

    sections = []

    for index, result in enumerate(results, start=1):
        metadata = result.get("metadata") or {}

        document = metadata.get("document", metadata.get("source", "Unknown"))
        policy_id = metadata.get("policy_id", metadata.get("id", "Unknown"))
        section = metadata.get("section", metadata.get("title", "Unknown"))
        chunk_id = str(result.get("id") or metadata.get("chunk_id", "Unknown"))

        sections.append(
            f"""
POLICY EVIDENCE {index}
Document: {document}
Policy ID: {policy_id}
Section: {section}
Chunk ID: {chunk_id}

{result.get("content", "")}
""".strip()
        )

    return "\n\n---\n\n".join(sections)