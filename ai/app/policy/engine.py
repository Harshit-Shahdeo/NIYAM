import re


def extract_field(
    text: str,
    field_name: str,
    next_fields: list[str],
) -> str | None:

    next_field_pattern = "|".join(
        re.escape(field)
        for field in next_fields
    )

    pattern = (
        rf"{re.escape(field_name)}:\s*"
        rf"(.*?)"
        rf"(?=\s+(?:{next_field_pattern}):|$)"
    )

    match = re.search(
        pattern,
        text,
        re.IGNORECASE | re.DOTALL,
    )

    if not match:
        return None

    return " ".join(
        match.group(1).split()
    )


def split_policies(
    policies: list[dict],
) -> list[str]:

    extracted_policies = []

    pattern = r"(?=Policy ID:\s*[A-Z]+-\d+)"

    for policy in policies:
        parts = re.split(
            pattern,
            policy["content"],
            flags=re.IGNORECASE,
        )

        for part in parts:
            if re.search(
                r"Policy ID:\s*[A-Z]+-\d+",
                part,
                re.IGNORECASE,
            ):
                extracted_policies.append(part)

    return extracted_policies


def parse_policy(
    text: str,
) -> dict | None:

    policy_id_match = re.search(
        r"Policy ID:\s*([A-Z]+-\d+)",
        text,
        re.IGNORECASE,
    )

    if not policy_id_match:
        return None

    policy_id = policy_id_match.group(1).upper()

    return {
        "policy_id": policy_id,

        "title": extract_field(
            text,
            "Title",
            [
                "Scope",
                "Applies To",
                "Rule",
                "Conditions",
                "Exceptions",
                "Approval Required",
                "Authority",
                "Priority",
                "Enforcement",
            ],
        ),

        "scope": extract_field(
            text,
            "Scope",
            [
                "Applies To",
                "Rule",
                "Conditions",
                "Exceptions",
                "Approval Required",
                "Authority",
                "Priority",
                "Enforcement",
            ],
        ),

        "applies_to": extract_field(
            text,
            "Applies To",
            [
                "Rule",
                "Conditions",
                "Exceptions",
                "Approval Required",
                "Authority",
                "Priority",
                "Enforcement",
            ],
        ),

        "rule": extract_field(
            text,
            "Rule",
            [
                "Conditions",
                "Exceptions",
                "Approval Required",
                "Authority",
                "Priority",
                "Enforcement",
            ],
        ),

        "conditions": extract_field(
            text,
            "Conditions",
            [
                "Exceptions",
                "Approval Required",
                "Authority",
                "Priority",
                "Enforcement",
            ],
        ),

        "exceptions": extract_field(
            text,
            "Exceptions",
            [
                "Approval Required",
                "Authority",
                "Priority",
                "Enforcement",
            ],
        ),

        "approval_required": extract_field(
            text,
            "Approval Required",
            [
                "Authority",
                "Priority",
                "Enforcement",
            ],
        ),

        "authority": extract_field(
            text,
            "Authority",
            [
                "Priority",
                "Enforcement",
            ],
        ),

        "priority": extract_field(
            text,
            "Priority",
            [
                "Enforcement",
            ],
        ),

        "enforcement": extract_field(
            text,
            "Enforcement",
            [],
        ),
    }


def analyze_policies(
    policies: list[dict],
) -> list[dict]:

    policy_texts = split_policies(policies)

    parsed_policies = []

    seen_policy_ids = set()

    for text in policy_texts:
        parsed_policy = parse_policy(text)

        if not parsed_policy:
            continue

        policy_id = parsed_policy["policy_id"]

        if policy_id in seen_policy_ids:
            continue

        seen_policy_ids.add(policy_id)

        parsed_policies.append(parsed_policy)

    return parsed_policies