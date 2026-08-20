def build_policy_context(results: list[dict]) -> str:
    if not results:
        return "No relevant institutional policies were found."

    sections = []

    for index, result in enumerate(results, start=1):
        metadata = result.get("metadata") or {}

        section = metadata.get("section", "Unknown")
        chunk_index = metadata.get("chunk_index", "Unknown")
        similarity = result.get("similarity", 0)

        sections.append(
            f"""
POLICY CONTEXT {index}
Similarity: {similarity:.4f}
Section: {section}
Chunk Index: {chunk_index}

{result["content"]}
""".strip()
        )

    return "\n\n---\n\n".join(sections)