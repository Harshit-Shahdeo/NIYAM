import json
import os
from pathlib import Path
from typing import Any

import httpx
from dotenv import load_dotenv

from app.schemas.request import AgentReasonRequest


AI_ROOT = Path(__file__).resolve().parents[2]
PROJECT_ROOT = AI_ROOT.parent

AI_ENV_PATH = AI_ROOT / ".env"
BACKEND_ENV_PATH = PROJECT_ROOT / "backend" / ".env"

if AI_ENV_PATH.exists():
    load_dotenv(AI_ENV_PATH)

if BACKEND_ENV_PATH.exists():
    load_dotenv(BACKEND_ENV_PATH, override=False)


class LLMService:
    """
    LLM client responsible for policy-grounded institutional reasoning.

    Supports:
    - Groq
    - OpenAI
    - Safe fallback when no provider is available
    """

    def __init__(self) -> None:
        self.mode = os.getenv("LLM_MODE", "live").lower()

        self.groq_api_key = os.getenv("GROQ_API_KEY")
        self.openai_api_key = os.getenv("OPENAI_API_KEY")

    def reason(
        self,
        request: AgentReasonRequest,
        policies: list[dict],
        policy_context: str,
        conversation_context: str,
        retrieved_chunks: list[dict],
        resources:list[dict],
    ) -> dict[str, Any]:
        """
        Perform policy-grounded institutional reasoning.
        """

        if self.mode == "live":
            result = self._call_live_llm(
                request=request,
                policies=policies,
                policy_context=policy_context,
                conversation_context=conversation_context,
                resources=resources,
            )

            if result is not None:
                return result

        return self._fallback_response()

    def _build_system_prompt(self) -> str:
        return """
You are NIYAM, an institutional AI reasoning engine.

Your responsibility is to understand user requests, reason over the
institutional policies provided to you, and produce a structured decision.

You may receive:

1. A user profile
2. The current user message
3. Conversation history
4. Structured institutional policies
5. Retrieved policy text
6. Available tools


IMPORTANT REASONING RULES

1. POLICY GROUNDING

Ground institutional decisions only in the policies provided in the context.

Do not invent institutional rules, restrictions, approvals, authorities,
or exceptions.

If the available policy information is insufficient to confidently make
a decision:

uncertainty_detected = true


2. UNDERSTAND THE USER'S INTENT

Classify the request appropriately.

Possible intents include:

- POLICY_INQUIRY
- LABORATORY_BOOKING
- GENERAL_QUERY
- UNKNOWN

Prefer these intents whenever applicable.


3. INFORMATIONAL REQUESTS

If the user is asking for information about a policy, rule, limit,
restriction, approval requirement, or institutional process:

proposed_action must be null.


4. ACTIONABLE REQUESTS

For actionable requests:

- Extract only information explicitly provided by the user or clearly
  established in conversation history.
- Never invent missing details.
- Use conversation history to resolve follow-up requests.
- If essential information is missing:

proposed_action = null
uncertainty_detected = true


5. APPROVAL REQUIREMENTS

If a relevant policy explicitly requires approval:

requires_approval = true
decision = REQUIRE_HUMAN_APPROVAL

If all essential information required to perform the requested action
is available, proposed_action MUST still contain the complete action
that would be executed after human approval.

Human approval controls authorization to execute the action.
It does not require proposed_action to be null.

Set proposed_action = null only when:

- essential action information is missing
- the requested resource cannot be matched confidently
- the action cannot be safely constructed from the provided information
- the request is informational
- the request is rejected


6. PROHIBITED REQUESTS

If the relevant policy clearly prohibits the request:

decision = REJECT


7. POLICY CONFLICTS

If multiple applicable policies genuinely conflict, analyze them using:

- priority
- scope
- conditions
- exceptions
- enforcement

Set:

policy_conflict_detected = true

only when there is an actual conflict.


8. CONVERSATION CONTEXT

Use previous conversation messages only when they help resolve a
follow-up request.

Do not assume information that does not exist.


9. LANGUAGE

Support:

- English
- Hindi
- Hinglish


10. TOOLS

Only propose actions using tools explicitly listed in the AVAILABLE TOOLS
section.

Never invent:

- tools
- operations
- arguments

11. AVAILABLE RESOURCES AND TOOL ARGUMENTS

The AVAILABLE RESOURCES section contains resources that currently exist
in the institutional system.

Each resource may contain:

- id
- name
- type
- other metadata

When proposing a LabBookingTool.book action:

1. Match the resource requested by the user to an appropriate resource
   from AVAILABLE RESOURCES.

2. The "resource" argument MUST use the exact canonical identifier
   provided in the resource's "id" field.

3. Never use a display name when an exact resource ID is available.

4. Never invent a resource identifier.

5. If the requested resource cannot be matched confidently to an
   available resource:

   proposed_action = null
   uncertainty_detected = true

For LabBookingTool.book:

Required arguments:

- resource
- date
- start
- end

Optional argument:

- purpose

Dates must use:

YYYY-MM-DD

Times must use:

HH:MM


12. DECISION RULES

Use:

ALLOW

when the requested action is permitted and does not require approval.

Use:

REQUIRE_HUMAN_APPROVAL

when the relevant policy explicitly requires approval or when the request
cannot safely proceed without institutional review.

Use:

REJECT

when the relevant policy clearly prohibits the request.


13. RESPONSE FORMAT

Return ONLY valid JSON.

Do not include:

- markdown
- explanations outside JSON
- code fences

The JSON must follow exactly this structure:

{
  "intent": string,
  "confidence_score": number,
  "uncertainty_detected": boolean,
  "policy_conflict_detected": boolean,
  "requires_approval": boolean,

  "decision":
    "ALLOW"
    | "REQUIRE_HUMAN_APPROVAL"
    | "REJECT",

  "proposed_action": {
    "tool": string,
    "operation": string,
    "arguments": object
  } | null,

  "reason": string
}
""".strip()

    def _call_live_llm(
        self,
        request: AgentReasonRequest,
        policies: list[dict],
        policy_context: str,
        conversation_context: str,
        resources:list[dict],
    ) -> dict[str, Any] | None:
        """
        Send the reasoning request to the configured LLM provider.
        """

        user_prompt = f"""
USER PROFILE

ID: {request.user.id}
Role: {request.user.role}
Department: {request.user.department or "N/A"}
Year: {request.user.year or "N/A"}


CURRENT USER MESSAGE

{request.message}


CONVERSATION HISTORY

{conversation_context or "No previous conversation."}


STRUCTURED RELEVANT POLICIES

{json.dumps(policies, indent=2)}


RETRIEVED POLICY CONTEXT

{policy_context}

AVAILABLE RESOURCES

{json.dumps(resources,indent=2)}

AVAILABLE TOOLS

LabBookingTool

Available operation:

book(
    resource,
    date,
    start,
    end,
    purpose
)


INSTRUCTIONS

Analyze the user's request.

Use the provided policies as the basis for institutional decisions.

Use conversation history only when necessary to resolve references or
follow-up requests.

Do not invent missing user information.

Return only valid JSON matching the required schema.
""".strip()

        messages = [
            {
                "role": "system",
                "content": self._build_system_prompt(),
            },
            {
                "role": "user",
                "content": user_prompt,
            },
        ]

        if self.groq_api_key:
            result = self._call_groq(messages)

            if result is not None:
                return result

        if self.openai_api_key:
            result = self._call_openai(messages)

            if result is not None:
                return result

        return None

    def _call_groq(
        self,
        messages: list[dict[str, str]],
    ) -> dict[str, Any] | None:
        """
        Call Groq using its OpenAI-compatible API.
        """

        url = "https://api.groq.com/openai/v1/chat/completions"

        headers = {
            "Authorization": f"Bearer {self.groq_api_key}",
            "Content-Type": "application/json",
        }

        body = {
            "model": "openai/gpt-oss-20b",
            "messages": messages,
            "response_format": {
                "type": "json_object",
            },
            "temperature": 0.1,
        }

        try:
            with httpx.Client(timeout=30.0) as client:
                response = client.post(
                    url,
                    headers=headers,
                    json=body,
                )

                response.raise_for_status()

                data = response.json()

                content = data["choices"][0]["message"]["content"]

                return json.loads(content)

        except Exception as error:
            print(f"[LLMService] Groq request failed: {error}")

            return None

    def _call_openai(
        self,
        messages: list[dict[str, str]],
    ) -> dict[str, Any] | None:
        """
        Call OpenAI using the Chat Completions API.
        """

        url = "https://api.openai.com/v1/chat/completions"

        headers = {
            "Authorization": f"Bearer {self.openai_api_key}",
            "Content-Type": "application/json",
        }

        body = {
            "model": "gpt-4o-mini",
            "messages": messages,
            "response_format": {
                "type": "json_object",
            },
            "temperature": 0.1,
        }

        try:
            with httpx.Client(timeout=30.0) as client:
                response = client.post(
                    url,
                    headers=headers,
                    json=body,
                )

                response.raise_for_status()

                data = response.json()

                content = data["choices"][0]["message"]["content"]

                return json.loads(content)

        except Exception as error:
            print(f"[LLMService] OpenAI request failed: {error}")

            return None

    def _fallback_response(self) -> dict[str, Any]:
        """
        Safe fallback when no LLM provider is available.
        """

        return {
            "intent": "UNKNOWN",
            "confidence_score": 0.0,
            "uncertainty_detected": True,
            "policy_conflict_detected": False,
            "requires_approval": False,
            "decision": "REQUIRE_HUMAN_APPROVAL",
            "proposed_action": None,
            "reason": (
                "The AI reasoning service is currently unavailable."
            ),
        }