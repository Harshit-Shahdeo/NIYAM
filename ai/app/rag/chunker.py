import re


def chunk_policies(
    text: str,
) -> list[dict]:

    pattern = r"(?=Policy ID:\s*[A-Z]+-\d+)"

    parts = re.split(
        pattern,
        text,
        flags=re.IGNORECASE,
    )

    policies = []

    for part in parts:
        part = part.strip()

        if not part:
            continue

        policy_id_match = re.search(
            r"Policy ID:\s*([A-Z]+-\d+)",
            part,
            re.IGNORECASE,
        )

        if not policy_id_match:
            continue

        policy_id = policy_id_match.group(1).upper()

        policies.append(
            {
                "policy_id": policy_id,
                "content": part,
            }
        )

    return policies