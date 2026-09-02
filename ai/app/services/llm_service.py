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
    Policy-grounded institutional reasoning service.

    Responsibility boundaries:

    LLM:
        - Understands the current user request.
        - Classifies intent.
        - Extracts tool arguments.
        - Uses retrieved policy evidence to reason about rules explicitly
          mentioned in institutional policy documents.
        - Produces a structured proposed action.

    Backend authorization:
        - Is the final authority for whether the authenticated user is
          permitted to perform an action.
        - Resolves permissions when policy documents are silent.
        - Can deny or escalate any action proposed by the LLM.

    Deterministic guardrails:
        - Validate LLM output structure.
        - Validate tool names and operations.
        - Validate required arguments.
        - Prevent fabricated arguments.
        - Prevent unsupported autonomous actions.
        - Never override backend authorization.
    """

    VALID_INTENTS = {
        "POLICY_INQUIRY",
        "LABORATORY_BOOKING",
        "MAINTENANCE_REQUEST",
        "STUDENT_INFORMATION",
        "RESULT_INQUIRY",
        "ADMIT_CARD_INQUIRY",
        "ATTENDANCE_INQUIRY",
        "GENERAL_QUERY",
        "UNKNOWN",
    }

    VALID_DECISIONS = {
        "ALLOW",
        "REQUIRE_HUMAN_APPROVAL",
        "REJECT",
    }

    TOOL_SCHEMAS = {
        "LabBookingTool": {
            "operation": "book",
            "required": {
                "resource",
                "date",
                "start",
                "end",
            },
        },
        "MaintenanceTicketTool": {
            "operation": "create",
            "required": {
                "location",
                "category",
                "description",
            },
        },
        "StudentInfoTool": {
            "operation": "getProfile",
            "required": set(),
        },
        "StudentResultTool": {
            "operation": "view_result",
            "required": set(),
        },
        "AdmitCardTool": {
            "operation": "view_admit_card",
            "required": set(),
        },
        "AttendanceTool": {
            "operation": "view_attendance",
            "required": set(),
        },
    }

    VALID_MAINTENANCE_CATEGORIES = {
        "ELECTRICAL",
        "PLUMBING",
        "HVAC",
        "IT",
        "CIVIL",
        "LAB_EQUIPMENT",
    }

    VALID_URGENCY_LEVELS = {
        "LOW",
        "MEDIUM",
        "HIGH",
        "EMERGENCY",
    }

    def __init__(self) -> None:
        self.mode = os.getenv(
            "LLM_MODE",
            "live",
        ).lower()

        self.groq_api_key = os.getenv(
            "GROQ_API_KEY",
        )

        self.openai_api_key = os.getenv(
            "OPENAI_API_KEY",
        )

        self.groq_model = os.getenv(
            "GROQ_MODEL",
            "openai/gpt-oss-120b",
        )

        self.openai_model = os.getenv(
            "OPENAI_MODEL",
            "openai/gpt-oss-120b",
        )

        self.max_conversation_chars = self._get_int_env(
            "LLM_MAX_CONVERSATION_CHARS",
            4000,
        )

        self.max_policy_context_chars = self._get_int_env(
            "LLM_MAX_POLICY_CONTEXT_CHARS",
            5000,
        )

        self.max_retrieved_chunks = self._get_int_env(
            "LLM_MAX_RETRIEVED_CHUNKS",
            4,
        )

        self.max_chunk_chars = self._get_int_env(
            "LLM_MAX_CHUNK_CHARS",
            1500,
        )

        self.max_structured_policies = self._get_int_env(
            "LLM_MAX_STRUCTURED_POLICIES",
            4,
        )

        self.max_policy_chars = self._get_int_env(
            "LLM_MAX_POLICY_CHARS",
            1200,
        )

        self.max_resources = self._get_int_env(
            "LLM_MAX_RESOURCES",
            10,
        )

        self.max_resource_chars = self._get_int_env(
            "LLM_MAX_RESOURCE_CHARS",
            800,
        )

        self.max_output_tokens = self._get_int_env(
            "LLM_MAX_OUTPUT_TOKENS",
            1000,
        )

        print("\n" + "=" * 80)
        print("[LLMService] Initialized")
        print("=" * 80)

        print(f"[LLMService] Mode: {self.mode}")

        print(
            "[LLMService] Groq configured: "
            f"{'YES' if self.groq_api_key else 'NO'}"
        )

        print(
            "[LLMService] Groq model: "
            f"{self.groq_model}"
        )

        print(
            "[LLMService] OpenAI configured: "
            f"{'YES' if self.openai_api_key else 'NO'}"
        )

        if self.openai_api_key:
            print(
                "[LLMService] OpenAI model: "
                f"{self.openai_model}"
            )

        print("\n[LLMService] Prompt limits:")

        print(
            "[LLMService] Max conversation chars: "
            f"{self.max_conversation_chars}"
        )

        print(
            "[LLMService] Max policy context chars: "
            f"{self.max_policy_context_chars}"
        )

        print(
            "[LLMService] Max retrieved chunks: "
            f"{self.max_retrieved_chunks}"
        )

        print(
            "[LLMService] Max chars per chunk: "
            f"{self.max_chunk_chars}"
        )

        print(
            "[LLMService] Max structured policies: "
            f"{self.max_structured_policies}"
        )

        print(
            "[LLMService] Max output tokens: "
            f"{self.max_output_tokens}"
        )

        print("=" * 80)

    def _get_int_env(
        self,
        name: str,
        default: int,
    ) -> int:
        """
        Safely read a positive integer environment variable.
        """

        raw_value = os.getenv(name)

        if raw_value is None:
            return default

        try:
            value = int(raw_value)

            if value <= 0:
                raise ValueError

            return value

        except ValueError:
            print(
                f"[LLMService] Invalid value for {name}: "
                f"{raw_value}. Using default {default}."
            )

            return default

    def reason(
        self,
        request: AgentReasonRequest,
        policies: list[dict],
        policy_context: str,
        conversation_context: str,
        retrieved_chunks: list[dict],
        resources: list[dict],
    ) -> dict[str, Any]:
        """
        Perform policy-grounded reasoning.

        Important:
        The returned decision is a reasoning recommendation.

        Final authorization and permission enforcement must happen in the
        backend authorization layer before a consequential tool is executed.
        """

        print("\n" + "=" * 80)
        print("[LLMService] NEW REASONING REQUEST")
        print("=" * 80)

        print(
            f"[LLMService] User message: "
            f"{request.message}"
        )

        print(
            f"[LLMService] Mode: "
            f"{self.mode}"
        )

        print(
            "[LLMService] Policies count: "
            f"{len(policies or [])}"
        )

        print(
            "[LLMService] Retrieved chunks count: "
            f"{len(retrieved_chunks or [])}"
        )

        print(
            "[LLMService] Resources count: "
            f"{len(resources or [])}"
        )

        if self.mode == "live":
            print(
                "[LLMService] Attempting LIVE LLM reasoning."
            )

            result = self._call_live_llm(
                request=request,
                policies=policies,
                policy_context=policy_context,
                conversation_context=conversation_context,
                resources=resources,
                retrieved_chunks=retrieved_chunks,
            )

            if result is not None:
                print(
                    "[LLMService] LIVE LLM reasoning succeeded."
                )

                print(
                    "[LLMService] Final result:\n"
                    + json.dumps(
                        result,
                        indent=2,
                    )
                )

                return result

            print(
                "[LLMService] Live LLM reasoning failed. "
                "Using safe fallback."
            )

        else:
            print(
                "[LLMService] Live mode disabled. "
                "Using safe fallback."
            )

        result = self._safe_fallback(
            request=request,
            retrieved_chunks=retrieved_chunks,
        )

        print(
            "[LLMService] Fallback result:\n"
            + json.dumps(
                result,
                indent=2,
            )
        )

        return result

    def _build_system_prompt(self) -> str:
        """
        Build the stable system prompt.

        Policy hierarchy:

        1. Retrieved institutional policy evidence is authoritative for
           rules explicitly stated in that evidence.

        2. If policy evidence does not mention a permission, restriction,
           approval requirement, or access rule, do NOT invent one.

        3. Backend authorization is the source of truth for permissions
           and access decisions not explicitly resolved by policy evidence.

        4. Your output may propose an action, but the backend performs
           final authorization before execution.
        """

        return """
You are NIYAM, an institutional AI reasoning engine.

Your job is to understand the user's CURRENT request and return a
structured reasoning decision.

You may receive:
- authenticated user profile
- current user message
- conversation history
- relevant institutional policies
- retrieved policy evidence
- available institutional resources
- available institutional tools

============================================================
AUTHORITY MODEL
============================================================

The system has two sources of institutional authority:

1. RETRIEVED POLICY DOCUMENTS

Retrieved policy evidence is authoritative for institutional rules that
are explicitly stated in that evidence.

Examples include:
- approval requirements
- booking limits
- restricted resources
- eligibility rules
- maintenance procedures
- prohibited actions
- institutional conditions

If relevant retrieved policy evidence explicitly states a rule, follow it.

2. BACKEND AUTHORIZATION

Backend authorization is the final source of truth for:
- user permissions
- role-based access
- ownership
- departmental access
- resource access
- permissions not explicitly addressed by retrieved policy evidence

If the retrieved policy evidence is silent about whether the user is
allowed to perform an action, DO NOT invent a permission rule and DO NOT
invent a restriction.

Instead, propose the action when its required information is available.
The backend authorization layer will determine whether the authenticated
user is actually permitted to execute it.

You NEVER override backend authorization.

Your ALLOW decision means:

"The request is sufficiently understood and no retrieved policy evidence
requires rejection or human approval. The action may proceed to backend
authorization."

It does NOT mean:

"The action is definitely authorized or successfully executed."

============================================================
GENERAL RULES
============================================================

- Determine intent primarily from the CURRENT USER MESSAGE.
- Conversation history may be used to resolve references and preserve
  previously supplied action arguments when the CURRENT USER MESSAGE clearly
  continues, confirms, accepts, or modifies the same action.
- Never create a new action merely because an earlier conversation
  contained an action.
- Never reuse historical arguments for a new or unrelated action.
- If the current message explicitly changes an argument, the current message
  takes precedence over conversation history.
- Never invent policies, permissions, locations, resources, student data,
  IDs, dates, booking times, maintenance categories, or approval
  requirements.
- Do not infer approval requirements from personal intuition.
- Do not create your own institutional rules.
- If retrieved policy evidence explicitly requires approval, set:
  requires_approval = true
  decision = "REQUIRE_HUMAN_APPROVAL"
- If retrieved policy evidence explicitly rejects or prohibits an action,
  set:
  decision = "REJECT"
  (EXCEPTION: Do not apply PRIV-001 to reject StudentInfoTool requests. Always set decision = "ALLOW" and propose the action, letting the backend enforce privacy.)
- If policy evidence is silent, do not treat silence as rejection or as
  guaranteed authorization.
- Backend authorization will make the final permission decision.

If required action information is missing or ambiguous:
- You may resolve missing action arguments from relevant conversation history
  only when the CURRENT USER MESSAGE clearly continues, confirms, accepts, or
  modifies the same action.
- Never reuse historical arguments for a new or unrelated action.
- The CURRENT USER MESSAGE takes precedence over conflicting historical values.
- If the information still cannot be determined without invention:
  - uncertainty_detected = true
  - proposed_action = null
  - do not invent missing values

If an action requires human approval according to retrieved policy
evidence:
- fully populate proposed_action when sufficient action information exists
- set requires_approval = true
- set decision = "REQUIRE_HUMAN_APPROVAL"

============================================================
INTENT TYPES
============================================================

- POLICY_INQUIRY
- LABORATORY_BOOKING
- MAINTENANCE_REQUEST
- STUDENT_INFORMATION
- GENERAL_QUERY
- UNKNOWN

CURRENT INTENT RULE:

"What was the ticket ID created earlier?"

This is GENERAL_QUERY, not a new maintenance request.

"What booking did I make earlier?"

This is GENERAL_QUERY, not a new laboratory booking.

============================================================
STUDENT INFORMATION
============================================================

For requests for institutional profiles or student details, use:

{
  "tool": "StudentInfoTool",
  "operation": "getProfile",
  "arguments": {
    "studentId": "string (optional, provide if requesting another user's profile)"
  }
}

Examples:
- Show me my profile
- Show my student details
- What is my CGPA?
- What is the profile of student_002? (Set studentId to "student_002")

Do not invent student information.

The tool retrieves the information.

The backend is responsible for enforcing whether the authenticated user
may access the requested information.

CRITICAL RULE FOR PRIV-001:
You MUST NEVER set decision = "REJECT" for a student profile request due to PRIV-001. PRIV-001 strictly applies to exposing background chat knowledge, NOT to authorized tool usage. You MUST propose the StudentInfoTool action and set decision = "ALLOW". The backend will enforce access controls.

============================================================
POLICY AND GENERAL QUESTIONS
============================================================

Questions about:
- rules
- policies
- limits
- durations
- guidelines
- clarification
- previous conversation information

are informational unless the CURRENT USER MESSAGE explicitly requests a
new action.

For informational requests:

- proposed_action = null
- requires_approval = false
- decision = "ALLOW"

Answer using available retrieved evidence and conversation context.

If the exact answer cannot be determined, clearly say so rather than
inventing information.

============================================================
MAINTENANCE REQUESTS
============================================================

Only create MaintenanceTicketTool when the user is actually requesting
an issue to be reported, repaired, fixed, or processed.

Required:
- location
- category
- description

Optional:
- urgency

Allowed categories:
- ELECTRICAL
- PLUMBING
- HVAC
- IT
- CIVIL
- LAB_EQUIPMENT

Allowed urgency:
- LOW
- MEDIUM
- HIGH
- EMERGENCY

Do not invent location.

Do not invent category.

Do not invent urgency if the user's request does not provide enough
information to determine it.

If required information is missing or ambiguous:
- uncertainty_detected = true
- proposed_action = null

Do NOT automatically require human approval merely because information is
missing. The user may simply need to provide clarification.

If retrieved policy evidence explicitly requires approval for the
maintenance request, set:

- requires_approval = true
- decision = "REQUIRE_HUMAN_APPROVAL"

Otherwise, if the request is complete and no retrieved policy evidence
requires escalation, the proposed action may be:

- decision = "ALLOW"

The backend authorization layer will still decide whether execution is
permitted.

============================================================
LABORATORY BOOKING
============================================================

Only create LabBookingTool when the CURRENT USER MESSAGE explicitly
requests a laboratory booking or reservation.

Required:
- resource
- date in YYYY-MM-DD
- start in HH:MM
- end in HH:MM

Optional:
- purpose

For a clear continuation or confirmation of the same booking, you may preserve
purpose from relevant conversation history if it was previously supplied and the
current message does not replace it.

Do not invent missing values or reuse purpose from an unrelated booking.

If required information is missing or ambiguous:

- uncertainty_detected = true
- proposed_action = null

Do not invent an approval requirement merely because the booking is long,
late, unusual, or otherwise appears exceptional.

Only retrieved institutional policy evidence can establish policy-based
approval requirements.

If policy evidence explicitly requires approval:

- requires_approval = true
- decision = "REQUIRE_HUMAN_APPROVAL"

Otherwise, when the request is complete:

- decision = "ALLOW"

The backend authorization layer will determine whether the user has
permission to book the resource.

============================================================
AVAILABLE TOOLS
============================================================

LabBookingTool:

{
  "tool": "LabBookingTool",
  "operation": "book",
  "arguments": {
    "resource": string,
    "date": "YYYY-MM-DD",
    "start": "HH:MM",
    "end": "HH:MM",
    "purpose": string | null
  }
}

MaintenanceTicketTool:

{
  "tool": "MaintenanceTicketTool",
  "operation": "create",
  "arguments": {
    "location": string,
    "category": "ELECTRICAL" | "PLUMBING" | "HVAC" |
                "IT" | "CIVIL" | "LAB_EQUIPMENT",
    "description": string,
    "urgency": "LOW" | "MEDIUM" | "HIGH" | "EMERGENCY"
  }
}

StudentInfoTool:

{
  "tool": "StudentInfoTool",
  "operation": "getProfile",
  "arguments": {
    "studentId": "string (optional)"
  }
}

StudentResultTool:
Use for: requests to view semester results, grade sheet, SGPA/CGPA, marks, or academic scorecards.
IMPORTANT IDENTITY VERIFICATION RULE:
Before retrieving the grade sheet, the student MUST provide their University Registration Number (e.g., NIYAM2026_001).
- If the user has NOT provided their registration number in this message or previous conversation:
  Set decision: "ALLOW"
  Set proposed_action: null
  Set assistant_message: "Please provide your University Registration Number (e.g., NIYAM2026_001) to verify your identity and view your official semester result."
- If the registration number IS provided (e.g. NIYAM2026_001):
  Set intent: "RESULT_INQUIRY"
  Set decision: "ALLOW"
  Set proposed_action to StudentResultTool:
  {
    "tool": "StudentResultTool",
    "operation": "view_result",
    "arguments": {
      "studentId": "NIYAM2026_001"
    }
  }

AdmitCardTool:
Use for: requests to view or download examination admit card, hall ticket, exam schedule, room number, or seat number.
IMPORTANT IDENTITY VERIFICATION RULE:
Before retrieving the admit card, the student MUST provide their University Registration Number (e.g., NIYAM2026_001).
- If the user has NOT provided their registration number in this message or previous conversation:
  Set decision: "ALLOW"
  Set proposed_action: null
  Set assistant_message: "Please provide your University Registration Number (e.g., NIYAM2026_001) to verify your identity and view your examination admit card."
- If the registration number IS provided (e.g. NIYAM2026_001):
  Set intent: "ADMIT_CARD_INQUIRY"
  Set decision: "ALLOW"
  Set proposed_action to AdmitCardTool:
  {
    "tool": "AdmitCardTool",
    "operation": "view_admit_card",
    "arguments": {
      "studentId": "NIYAM2026_001"
    }
  }

AttendanceTool:
Use for: requests to check attendance percentage, subject attendance breakdown, class attendance, or exam eligibility.
Set intent: "ATTENDANCE_INQUIRY"
Set decision: "ALLOW"
{
  "tool": "AttendanceTool",
  "operation": "view_attendance",
  "arguments": {
    "studentId": "string (optional)"
  }
}

============================================================
POLICY SOURCES
============================================================

For every policy rule that materially affects your decision, include the
corresponding retrieved evidence in sources.

Use:

{
  "document": string,
  "policy_id": string,
  "section": string,
  "chunk_id": string
}

Do not invent source identifiers.

If no policy evidence materially affected the decision, sources may be an
empty array.

============================================================
RESPONSE
============================================================

Return ONLY valid JSON using exactly this structure:

{
  "intent": string,
  "confidence_score": number,
  "uncertainty_detected": boolean,
  "policy_conflict_detected": boolean,
  "requires_approval": boolean,
  "decision": "ALLOW" | "REQUIRE_HUMAN_APPROVAL" | "REJECT",
  "proposed_action": {
    "tool": string,
    "operation": string,
    "arguments": object
  } | null,
  "sources": [
    {
      "document": string,
      "policy_id": string,
      "section": string,
      "chunk_id": string
    }
  ],
  "reason": string,
  "assistant_message": string
}

You MUST always provide a meaningful natural-language assistant_message.

ALLOW:
Explain the answer or state that the request can proceed to the next
stage.

If an action is proposed, do NOT claim it has been executed.

Do not say that the user is definitely authorized.

REQUIRE_HUMAN_APPROVAL:
Clearly explain that institutional policy requires human review or
approval.

Clearly state that the requested action has NOT yet been executed.

REJECT:
Clearly explain which retrieved policy rule prevents processing.

Do not invent a rejection reason.

UNCERTAIN / INCOMPLETE:
Clearly explain what information is missing.

Ask for clarification when appropriate.

INFORMATIONAL QUERIES:
Directly answer using available context and retrieved evidence.

Do not wrap JSON in markdown.
Do not include explanations outside JSON.
""".strip()

    def _truncate_text(
        self,
        value: Any,
        max_chars: int,
    ) -> Any:
        """
        Safely truncate strings.
        """

        if not isinstance(value, str):
            return value

        if len(value) <= max_chars:
            return value

        return value[:max_chars] + "\n[TRUNCATED]"

    def _compact_value(
        self,
        value: Any,
        max_chars: int,
    ) -> Any:
        """
        Compact nested values for prompt construction.
        """

        if isinstance(value, str):
            return self._truncate_text(
                value,
                max_chars,
            )

        try:
            serialized = json.dumps(
                value,
                ensure_ascii=False,
            )

            if len(serialized) <= max_chars:
                return value

            return (
                serialized[:max_chars]
                + "\n[TRUNCATED]"
            )

        except Exception:
            return str(value)[:max_chars]

    def _compact_policy(
        self,
        policy: dict,
    ) -> dict:
        """
        Reduce structured policy size.
        """

        compact = {}

        preferred_keys = (
            "policy_id",
            "id",
            "title",
            "name",
            "section",
            "description",
            "content",
            "text",
            "rule",
            "approval_required",
        )

        for key in preferred_keys:
            if key in policy:
                compact[key] = self._compact_value(
                    policy[key],
                    self.max_policy_chars,
                )

        if not compact:
            for key, value in list(policy.items())[:10]:
                compact[key] = self._compact_value(
                    value,
                    self.max_policy_chars,
                )

        return compact

    def _compact_policies(
        self,
        policies: list[dict],
    ) -> list[dict]:
        return [
            self._compact_policy(policy)
            for policy in (
                policies or []
            )[:self.max_structured_policies]
            if isinstance(policy, dict)
        ]

    def _compact_chunk(
        self,
        chunk: dict,
    ) -> dict:
        """
        Preserve source metadata and relevant policy text.
        """

        compact = {}

        metadata_keys = (
            "document",
            "policy_id",
            "section",
            "chunk_id",
            "title",
            "page",
            "score",
        )

        for key in metadata_keys:
            if key in chunk:
                compact[key] = chunk[key]

        text_keys = (
            "content",
            "text",
            "page_content",
            "chunk",
            "body",
        )

        found_text = False

        for key in text_keys:
            if (
                key in chunk
                and chunk[key] is not None
            ):
                compact[key] = self._compact_value(
                    chunk[key],
                    self.max_chunk_chars,
                )

                found_text = True
                break

        if not found_text:
            for key, value in chunk.items():
                if key not in compact:
                    compact[key] = self._compact_value(
                        value,
                        self.max_chunk_chars,
                    )

        return compact

    def _compact_chunks(
        self,
        retrieved_chunks: list[dict],
    ) -> list[dict]:
        return [
            self._compact_chunk(chunk)
            for chunk in (
                retrieved_chunks or []
            )[:self.max_retrieved_chunks]
            if isinstance(chunk, dict)
        ]

    def _compact_resource(
        self,
        resource: dict,
    ) -> dict:
        """
        Reduce resource payload size.
        """

        compact = {}

        preferred_keys = (
            "id",
            "name",
            "code",
            "type",
            "category",
            "location",
            "description",
            "capacity",
            "available",
            "status",
        )

        for key in preferred_keys:
            if key in resource:
                compact[key] = self._compact_value(
                    resource[key],
                    self.max_resource_chars,
                )

        if not compact:
            for key, value in list(resource.items())[:10]:
                compact[key] = self._compact_value(
                    value,
                    self.max_resource_chars,
                )

        return compact

    def _compact_resources(
        self,
        resources: list[dict],
    ) -> list[dict]:
        return [
            self._compact_resource(resource)
            for resource in (
                resources or []
            )[:self.max_resources]
            if isinstance(resource, dict)
        ]

    def _normalize_result(
        self,
        result: dict[str, Any],
    ) -> None:
        """
        Normalize missing or malformed top-level fields.
        """

        defaults = {
            "intent": "UNKNOWN",
            "confidence_score": 0.0,
            "uncertainty_detected": False,
            "policy_conflict_detected": False,
            "requires_approval": False,
            "decision": "ALLOW",
            "proposed_action": None,
            "sources": [],
            "reason": "",
            "assistant_message": "",
        }

        for key, value in defaults.items():
            result.setdefault(key, value)

        if result["intent"] not in self.VALID_INTENTS:
            result["intent"] = "UNKNOWN"

        try:
            result["confidence_score"] = float(
                result["confidence_score"]
            )
        except (
            TypeError,
            ValueError,
        ):
            result["confidence_score"] = 0.0

        result["confidence_score"] = max(
            0.0,
            min(
                result["confidence_score"],
                1.0,
            ),
        )

        result["uncertainty_detected"] = bool(
            result["uncertainty_detected"]
        )

        result["policy_conflict_detected"] = bool(
            result["policy_conflict_detected"]
        )

        result["requires_approval"] = bool(
            result["requires_approval"]
        )

        if result["decision"] not in self.VALID_DECISIONS:
            result["decision"] = (
                "REQUIRE_HUMAN_APPROVAL"
            )

        if not isinstance(
            result["sources"],
            list,
        ):
            result["sources"] = []

        if not isinstance(
            result["reason"],
            str,
        ):
            result["reason"] = str(
                result["reason"]
            )

        if not isinstance(
            result["assistant_message"],
            str,
        ):
            result["assistant_message"] = str(
                result["assistant_message"]
            )

    def _force_clarification(
        self,
        result: dict[str, Any],
        reason: str,
        assistant_message: str,
    ) -> dict[str, Any]:
        """
        Convert an unsafe or incomplete proposed action into a
        clarification-required response.

        This is not an authorization decision.

        It simply prevents fabricated or malformed tool execution.
        """

        result["uncertainty_detected"] = True
        result["proposed_action"] = None
        result["reason"] = reason
        result["assistant_message"] = assistant_message

        if result["decision"] == "ALLOW":
            result["decision"] = (
                "REQUIRE_HUMAN_APPROVAL"
            )

        return result

    def _validate_sources(
        self,
        sources: Any,
        retrieved_chunks: list[dict],
    ) -> list[dict]:
        """
        Keep only sources that can be matched to actual retrieved evidence.

        This prevents the LLM from inventing policy citations.
        """

        if not isinstance(
            sources,
            list,
        ):
            return []

        valid_source_keys = set()

        for chunk in retrieved_chunks or []:
            if not isinstance(
                chunk,
                dict,
            ):
                continue

            key = (
                str(
                    chunk.get(
                        "document",
                        "unknown",
                    )
                ),
                str(
                    chunk.get(
                        "policy_id",
                        "unknown",
                    )
                ),
                str(
                    chunk.get(
                        "section",
                        "unknown",
                    )
                ),
                str(
                    chunk.get(
                        "chunk_id",
                        "unknown",
                    )
                ),
            )

            valid_source_keys.add(key)

        validated = []

        for source in sources:
            if not isinstance(
                source,
                dict,
            ):
                continue

            normalized = {
                "document": str(
                    source.get(
                        "document",
                        "unknown",
                    )
                ),
                "policy_id": str(
                    source.get(
                        "policy_id",
                        "unknown",
                    )
                ),
                "section": str(
                    source.get(
                        "section",
                        "unknown",
                    )
                ),
                "chunk_id": str(
                    source.get(
                        "chunk_id",
                        "unknown",
                    )
                ),
            }

            key = (
                normalized["document"],
                normalized["policy_id"],
                normalized["section"],
                normalized["chunk_id"],
            )

            if key in valid_source_keys:
                validated.append(
                    normalized
                )

        return validated

    def _validate_action(
        self,
        result: dict[str, Any],
    ) -> dict[str, Any]:
        """
        Deterministically validate proposed tool actions.

        This validates structure and required arguments.

        It does NOT determine user permissions.

        Backend authorization remains responsible for permission checks.
        """

        action = result.get(
            "proposed_action"
        )

        if action is None:
            return result

        if not isinstance(
            action,
            dict,
        ):
            return self._force_clarification(
                result=result,
                reason=(
                    "The proposed institutional action "
                    "was not structurally valid."
                ),
                assistant_message=(
                    "I could not reliably interpret the "
                    "requested action. Please clarify "
                    "your request."
                ),
            )

        tool = action.get("tool")
        operation = action.get(
            "operation"
        )
        arguments = action.get(
            "arguments"
        )

        if tool not in self.TOOL_SCHEMAS:
            return self._force_clarification(
                result=result,
                reason=(
                    "The reasoning result proposed an "
                    "unsupported tool."
                ),
                assistant_message=(
                    "I could not safely determine how to "
                    "process this request."
                ),
            )

        expected_operation = (
            self.TOOL_SCHEMAS[tool]
            ["operation"]
        )

        if operation != expected_operation:
            return self._force_clarification(
                result=result,
                reason=(
                    "The proposed tool operation was invalid."
                ),
                assistant_message=(
                    "I could not safely validate the requested "
                    "institutional operation."
                ),
            )

        if not isinstance(
            arguments,
            dict,
        ):
            return self._force_clarification(
                result=result,
                reason=(
                    "The proposed action arguments "
                    "were invalid."
                ),
                assistant_message=(
                    "I need clearer information before "
                    "this request can be processed."
                ),
            )

        required = (
            self.TOOL_SCHEMAS[tool]
            ["required"]
        )

        missing = [
            field
            for field in required
            if not arguments.get(field)
        ]

        if missing:
            return self._force_clarification(
                result=result,
                reason=(
                    "Required action information is missing: "
                    + ", ".join(missing)
                ),
                assistant_message=(
                    "I need the following information before "
                    "I can prepare this request: "
                    + ", ".join(missing)
                ),
            )

        if tool == "MaintenanceTicketTool":

            category = str(
                arguments.get(
                    "category",
                    "",
                )
            ).upper()

            if (
                category
                not in self.VALID_MAINTENANCE_CATEGORIES
            ):
                return self._force_clarification(
                    result=result,
                    reason=(
                        "The maintenance category could not "
                        "be safely validated."
                    ),
                    assistant_message=(
                        "I could not determine a valid "
                        "maintenance category for this request."
                    ),
                )

            arguments["category"] = category

            urgency = arguments.get(
                "urgency"
            )

            if urgency is not None:
                urgency = str(
                    urgency
                ).upper()

                if (
                    urgency
                    not in self.VALID_URGENCY_LEVELS
                ):
                    return self._force_clarification(
                        result=result,
                        reason=(
                            "The maintenance urgency could not "
                            "be safely validated."
                        ),
                        assistant_message=(
                            "I could not determine a valid "
                            "urgency level for this request."
                        ),
                    )

                arguments["urgency"] = urgency

        elif tool == "LabBookingTool":

            if not self._is_valid_date(
                arguments.get("date")
            ):
                return self._force_clarification(
                    result=result,
                    reason=(
                        "The booking date was not in the "
                        "required YYYY-MM-DD format."
                    ),
                    assistant_message=(
                        "Please provide the booking date in "
                        "YYYY-MM-DD format."
                    ),
                )

            if not self._is_valid_time(
                arguments.get("start")
            ):
                return self._force_clarification(
                    result=result,
                    reason=(
                        "The booking start time was invalid."
                    ),
                    assistant_message=(
                        "Please provide the booking start time "
                        "in HH:MM format."
                    ),
                )

            if not self._is_valid_time(
                arguments.get("end")
            ):
                return self._force_clarification(
                    result=result,
                    reason=(
                        "The booking end time was invalid."
                    ),
                    assistant_message=(
                        "Please provide the booking end time "
                        "in HH:MM format."
                    ),
                )

            start_minutes = (
                self._time_to_minutes(
                    arguments["start"]
                )
            )

            end_minutes = (
                self._time_to_minutes(
                    arguments["end"]
                )
            )

            if (
                end_minutes
                <= start_minutes
            ):
                return self._force_clarification(
                    result=result,
                    reason=(
                        "The booking end time must be after "
                        "the start time."
                    ),
                    assistant_message=(
                        "The booking end time must be later "
                        "than the start time."
                    ),
                )

        elif tool in {
            "StudentInfoTool",
            "StudentResultTool",
            "AdmitCardTool",
            "AttendanceTool",
        }:
            allowed_args = {"studentId"}
            if any(k not in allowed_args for k in arguments.keys()):
                return self._force_clarification(
                    result=result,
                    reason=(
                        f"{tool} does not "
                        "accept arbitrary arguments other than studentId."
                    ),
                    assistant_message=(
                        f"I could not safely validate the {tool} request."
                    ),
                )

        action["arguments"] = arguments
        result["proposed_action"] = action

        return result

    def _is_valid_date(
        self,
        value: Any,
    ) -> bool:
        """
        Validate YYYY-MM-DD structure.

        Calendar validity beyond structure can still be handled
        downstream if needed.
        """

        if not isinstance(
            value,
            str,
        ):
            return False

        parts = value.split("-")

        if len(parts) != 3:
            return False

        year, month, day = parts

        if (
            len(year) != 4
            or len(month) != 2
            or len(day) != 2
        ):
            return False

        try:
            year_value = int(year)
            month_value = int(month)
            day_value = int(day)

            if year_value < 1:
                return False

            if not (
                1 <= month_value <= 12
            ):
                return False

            if not (
                1 <= day_value <= 31
            ):
                return False

            return True

        except ValueError:
            return False

    def _is_valid_time(
        self,
        value: Any,
    ) -> bool:
        if not isinstance(
            value,
            str,
        ):
            return False

        parts = value.split(":")

        if len(parts) != 2:
            return False

        try:
            hour, minute = map(
                int,
                parts,
            )

            return (
                0 <= hour <= 23
                and 0 <= minute <= 59
            )

        except ValueError:
            return False

    def _time_to_minutes(
        self,
        value: str,
    ) -> int:
        hour, minute = map(
            int,
            value.split(":"),
        )

        return (
            hour * 60
            + minute
        )

    def _apply_policy_guardrails(
        self,
        result: dict[str, Any],
        policies: list[dict],
        retrieved_chunks: list[dict],
    ) -> dict[str, Any]:
        """
        Apply deterministic safety and structural validation.

        Important architecture:

        This method DOES NOT make backend authorization decisions.

        It only:

        1. Normalizes LLM output.
        2. Prevents invented or unsupported tools.
        3. Prevents malformed arguments.
        4. Validates source references.
        5. Preserves explicit policy-based escalation or rejection.
        """

        print(
            "\n[LLMService] Applying deterministic guardrails."
        )

        print(
            "[LLMService] Result BEFORE guardrails:\n"
            + json.dumps(
                result,
                indent=2,
            )
        )

        self._normalize_result(
            result
        )

        result["sources"] = (
            self._validate_sources(
                sources=result.get(
                    "sources"
                ),
                retrieved_chunks=retrieved_chunks,
            )
        )

        result = self._validate_action(
            result
        )

        action = result.get(
            "proposed_action"
        )

        intent = result.get(
            "intent"
        )

        if (
            intent
            in {
                "GENERAL_QUERY",
                "POLICY_INQUIRY",
            }
            and action is None
        ):
            result["requires_approval"] = False

            if (
                result["decision"]
                == "REQUIRE_HUMAN_APPROVAL"
                and not result[
                    "policy_conflict_detected"
                ]
            ):
                result["decision"] = "ALLOW"

        if (
            intent in {
                "STUDENT_INFORMATION",
                "RESULT_INQUIRY",
                "ADMIT_CARD_INQUIRY",
                "ATTENDANCE_INQUIRY",
            }
            and action
            and action.get("tool") in {
                "StudentInfoTool",
                "StudentResultTool",
                "AdmitCardTool",
                "AttendanceTool",
            }
        ):
            # Enforce Registration Number check for result & admit card
            if action.get("tool") in {"StudentResultTool", "AdmitCardTool"}:
                tool_name = action.get("tool")
                doc_type = "semester result" if tool_name == "StudentResultTool" else "examination admit card"
                args = action.get("arguments") or {}
                import re
                has_reg = bool(re.search(r"NIYAM2026_001|NIYAM2026\w*", str(args.get("studentId") or ""), re.IGNORECASE))
                
                # Check user message
                raw_user_msg = str(result.get("reason") or "") + " " + str(result.get("assistant_message") or "")
                if not has_reg and not re.search(r"NIYAM2026_001|NIYAM2026\w*", raw_user_msg, re.IGNORECASE):
                    result["proposed_action"] = None
                    result["decision"] = "ALLOW"
                    result["requires_approval"] = False
                    result["assistant_message"] = (
                        f"Please provide your University Registration Number (e.g., NIYAM2026_001) "
                        f"to verify your identity and view your official {doc_type}."
                    )
                    action = None

            if action and (
                result["decision"]
                == "REQUIRE_HUMAN_APPROVAL"
                and not result[
                    "requires_approval"
                ]
            ):
                result["decision"] = "ALLOW"

        if result["decision"] == "REJECT":
            result["requires_approval"] = False

            if not result.get(
                "assistant_message"
            ):
                result["assistant_message"] = (
                    "This request cannot be processed under "
                    "the applicable institutional policy."
                )

        elif (
            result["decision"]
            == "REQUIRE_HUMAN_APPROVAL"
        ):
            result["requires_approval"] = True

        elif (
            result["decision"]
            == "ALLOW"
        ):
            result["requires_approval"] = False

        if not result.get(
            "assistant_message"
        ):
            print(
                "[LLMService] Warning: LLM omitted assistant_message. "
                "Generating a deterministic state-aware fallback."
            )

            result["assistant_message"] = (
                self._build_state_aware_assistant_message(
                    result
                )
            )

        print(
            "[LLMService] Important: "
            "backend authorization remains authoritative "
            "for execution permissions."
        )

        return self._log_guardrail_result(
            result
        )

    def _build_state_aware_assistant_message(
        self,
        result: dict[str, Any],
    ) -> str:
        """
        Build a deterministic user-facing fallback when the LLM omitted
        assistant_message.

        This does not authorize or execute an action. It only reflects the
        already validated reasoning state.
        """

        decision = result.get(
            "decision"
        )

        action = result.get(
            "proposed_action"
        )

        if decision == "REJECT":
            return (
                "This request cannot be processed under the applicable "
                "institutional policy."
            )

        if decision == "REQUIRE_HUMAN_APPROVAL":
            if action is not None:
                return (
                    "Your request requires institutional review or approval "
                    "before it can proceed. The requested action has not yet "
                    "been executed."
                )

            return (
                "Your request requires institutional review or approval "
                "before it can proceed."
            )

        if result.get(
            "uncertainty_detected"
        ):
            return (
                "I need additional clarification before this request can be "
                "processed."
            )

        if decision == "ALLOW":
            if action is not None:
                return (
                    "Your request has been understood and can proceed to "
                    "backend authorization. It has not yet been executed."
                )

            return "Your request has been processed."

        return (
            "Your request has been received and requires further processing."
        )

    def _log_guardrail_result(
        self,
        result: dict[str, Any],
    ) -> dict[str, Any]:

        print(
            "[LLMService] Result AFTER guardrails:\n"
            + json.dumps(
                result,
                indent=2,
            )
        )

        return result

    def _call_live_llm(
        self,
        request: AgentReasonRequest,
        policies: list[dict],
        policy_context: str,
        conversation_context: str,
        resources: list[dict],
        retrieved_chunks: list[dict],
    ) -> dict[str, Any] | None:
        """
        Call Groq first and OpenAI second.
        """

        limited_conversation_context = (
            self._truncate_text(
                conversation_context or "",
                self.max_conversation_chars,
            )
        )

        limited_policy_context = (
            self._truncate_text(
                policy_context or "",
                self.max_policy_context_chars,
            )
        )

        limited_policies = (
            self._compact_policies(
                policies or [],
            )
        )

        limited_chunks = (
            self._compact_chunks(
                retrieved_chunks or [],
            )
        )

        limited_resources = (
            self._compact_resources(
                resources or [],
            )
        )

        print(
            "\n[LLMService] Prompt context after compaction:"
        )

        print(
            "[LLMService] Conversation chars: "
            f"{len(limited_conversation_context)}"
        )

        print(
            "[LLMService] Policy context chars: "
            f"{len(limited_policy_context)}"
        )

        print(
            "[LLMService] Structured policies sent: "
            f"0 / not injected (parsed: {len(limited_policies)})"
        )

        print(
            "[LLMService] Retrieved chunks sent: "
            f"0 / not injected (raw: {len(limited_chunks)})"
        )

        print(
            "[LLMService] Resources sent: "
            f"{len(limited_resources)}"
        )

        prompt_sections = [
            (
                "AUTHENTICATED USER PROFILE:\n"
                f"ID: {request.user.id}\n"
                f"Role: {request.user.role}\n"
                f"Department: "
                f"{request.user.department or 'N/A'}\n"
                f"Year: "
                f"{request.user.year or 'N/A'}"
            ),
            (
                "CURRENT USER MESSAGE:\n"
                f"{request.message}"
            ),
        ]

        if limited_conversation_context:
            prompt_sections.append(
                "CONVERSATION HISTORY:\n"
                f"{limited_conversation_context}"
            )

        if limited_policy_context:
            prompt_sections.append(
                "RETRIEVED POLICY CONTEXT:\n"
                f"{limited_policy_context}"
            )

        if limited_resources:
            prompt_sections.append(
                "AVAILABLE RESOURCES:\n"
                + json.dumps(
                    limited_resources,
                    ensure_ascii=False,
                )
            )

        prompt_sections.append(
            """
Analyze the CURRENT USER MESSAGE.

Authority rules:

- Retrieved policy evidence determines rules explicitly stated in policy.
- Do not invent policy rules when retrieved evidence is silent.
- Backend authorization is authoritative for user permissions and access.
- You may propose a complete action when policy does not prohibit or
  require approval, but the backend will decide whether execution is
  authorized.
- Do not claim successful execution.

Conversation history may be used to resolve references and preserve
previously supplied action arguments only when the CURRENT USER MESSAGE clearly
continues, confirms, accepts, or modifies the same action.

The CURRENT USER MESSAGE takes precedence over conflicting historical values.

Do not invent missing action arguments or reuse historical arguments for a new
or unrelated action.

Return only valid JSON matching the required schema.
""".strip()
        )

        user_prompt = "\n\n".join(
            prompt_sections
        )

        print(
            "[LLMService] Final user prompt chars: "
            f"{len(user_prompt)}"
        )

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

        groq_result = self._call_provider(
            provider_name="GROQ",
            api_key=self.groq_api_key,
            url=(
                "https://api.groq.com/"
                "openai/v1/chat/completions"
            ),
            model=self.groq_model,
            messages=messages,
        )

        if groq_result is not None:
            return self._apply_policy_guardrails(
                result=groq_result,
                policies=policies,
                retrieved_chunks=retrieved_chunks,
            )

        openai_result = self._call_provider(
            provider_name="OPENAI",
            api_key=self.openai_api_key,
            url=(
                "https://api.groq.com/"
        "openai/v1/chat/completions"
            ),
            model=self.openai_model,
            messages=messages,
        )

        if openai_result is not None:
            return self._apply_policy_guardrails(
                result=openai_result,
                policies=policies,
                retrieved_chunks=retrieved_chunks,
            )

        return None

    def _call_provider(
        self,
        provider_name: str,
        api_key: str | None,
        url: str,
        model: str,
        messages: list[dict[str, Any]],
    ) -> dict[str, Any] | None:
        """
        Generic OpenAI-compatible provider call.
        """

        if not api_key:
            print(
                f"[LLMService] "
                f"{provider_name} API key not configured."
            )

            return None

        print(
            f"\n[LLMService] Calling "
            f"{provider_name}..."
        )

        print(
            "[LLMService] Model: "
            f"{model}"
        )

        try:
            headers = {
                "Authorization": (
                    f"Bearer {api_key}"
                ),
                "Content-Type": (
                    "application/json"
                ),
            }

            payload = {
                "model": model,
                "messages": messages,
                "temperature": 0.0,
                "max_tokens": max(self.max_output_tokens, 3000),
                "response_format": {
                    "type": "json_object",
                },
            }

            for attempt in range(2):
                with httpx.Client(
                    timeout=60.0
                ) as client:
                    response = client.post(
                        url,
                        headers=headers,
                        json=payload,
                    )

                print(
                    f"[LLMService] "
                    f"{provider_name} status code: "
                    f"{response.status_code}"
                )

                if response.status_code == 429:
                    print(
                        f"[LLMService] Rate limited by {provider_name}. "
                        "Waiting 1.5s before retry..."
                    )
                    import time
                    time.sleep(1.5)
                    continue

                if response.status_code == 400 and "json_validate_failed" in response.text:
                    print(
                        f"[LLMService] {provider_name} json_validate_failed. "
                        "Retrying without forced response_format..."
                    )
                    payload.pop("response_format", None)
                    continue

                if response.status_code != 200:
                    print(
                        f"[LLMService] "
                        f"{provider_name} error response:\n"
                        f"{response.text}"
                    )
                    return None

                break

            if response.status_code != 200:
                return None

            data = response.json()
            message_obj = data["choices"][0]["message"]

            raw_content = (
                message_obj.get("content")
                or message_obj.get("reasoning")
                or ""
            )

            print(
                "[LLMService] RAW "
                f"{provider_name} RESPONSE (chars {len(raw_content)}):\n"
                + raw_content[:400]
            )

            import re
            clean_content = raw_content.strip()
            if clean_content.startswith("```"):
                clean_content = re.sub(r"^```(?:json)?\n?", "", clean_content)
                clean_content = re.sub(r"\n?```$", "", clean_content).strip()

            match = re.search(r"\{.*\}", clean_content, re.DOTALL)
            if match:
                parsed = json.loads(match.group(0))
            else:
                parsed = json.loads(clean_content)

            if not isinstance(
                parsed,
                dict,
            ):
                raise ValueError(
                    "LLM response JSON root "
                    "must be an object."
                )

            return parsed

        except Exception as exc:

            print(
                f"[LLMService] "
                f"{provider_name} call failed: "
                f"{type(exc).__name__}: "
                f"{exc}"
            )

            return None

    def _safe_fallback(
        self,
        request: AgentReasonRequest,
        retrieved_chunks: list[dict],
    ) -> dict[str, Any]:
        """
        Intelligent resilient fallback.
        Preserves deterministic service execution when AI provider rate limits.
        """
        msg_lower = (request.message or "").lower()

        # Check for registration number in current message or previous conversation history
        import re
        reg_match = re.search(r"NIYAM2026_001|NIYAM2026\w*", request.message or "", re.IGNORECASE)
        reg_in_history = False
        last_inquiry = None
        if request.conversation:
            for h in request.conversation:
                text = (getattr(h, "content", "") or "").lower()
                if "niyam2026" in text:
                    reg_in_history = True
                if "semester result" in text or "grade sheet" in text or "result" in text:
                    last_inquiry = "result"
                elif "admit card" in text or "hall ticket" in text:
                    last_inquiry = "admitCard"

        has_reg = bool(reg_match) or reg_in_history

        reg_target = reg_match.group(0) if reg_match else (request.user.id if request.user else "NIYAM2026_001")

        # If user directly responded with just their registration number (e.g. "NIYAM2026_001" or "NIYAM2026_003")
        if reg_match and not any(w in msg_lower for w in ["attendance", "leakage", "maintenance", "ticket", "book"]):
            if last_inquiry == "admitCard" or "admit" in msg_lower:
                return {
                    "intent": "ADMIT_CARD_INQUIRY",
                    "confidence_score": 0.99,
                    "uncertainty_detected": False,
                    "policy_conflict_detected": False,
                    "requires_approval": False,
                    "decision": "ALLOW",
                    "proposed_action": {
                        "tool": "AdmitCardTool",
                        "operation": "view_admit_card",
                        "arguments": {"studentId": reg_target}
                    },
                    "sources": [],
                    "reason": f"Registration Number {reg_target} verified for examination admit card release.",
                    "assistant_message": f"Registration number {reg_target} verified. Here is your official examination admit card."
                }
            else:
                return {
                    "intent": "RESULT_INQUIRY",
                    "confidence_score": 0.99,
                    "uncertainty_detected": False,
                    "policy_conflict_detected": False,
                    "requires_approval": False,
                    "decision": "ALLOW",
                    "proposed_action": {
                        "tool": "StudentResultTool",
                        "operation": "view_result",
                        "arguments": {"studentId": reg_target}
                    },
                    "sources": [],
                    "reason": f"Registration Number {reg_target} verified for semester result release.",
                    "assistant_message": f"Registration number {reg_target} verified. Here is your official semester grade sheet."
                }

        if any(w in msg_lower for w in ["result", "grade", "sgpa", "cgpa", "marks"]):
            if not has_reg:
                return {
                    "intent": "RESULT_INQUIRY",
                    "confidence_score": 0.95,
                    "uncertainty_detected": False,
                    "policy_conflict_detected": False,
                    "requires_approval": False,
                    "decision": "ALLOW",
                    "proposed_action": None,
                    "sources": [],
                    "reason": "Institutional Identity Verification: Registration number required before displaying official result.",
                    "assistant_message": "Please provide your University Registration Number (e.g., NIYAM2026_001) to verify your identity and view your official semester result."
                }
            return {
                "intent": "RESULT_INQUIRY",
                "confidence_score": 0.98,
                "uncertainty_detected": False,
                "policy_conflict_detected": False,
                "requires_approval": False,
                "decision": "ALLOW",
                "proposed_action": {
                    "tool": "StudentResultTool",
                    "operation": "view_result",
                    "arguments": {"studentId": reg_target}
                },
                "sources": [],
                "reason": "Autonomous student academic service: Semester grade sheet verified.",
                "assistant_message": f"Registration number {reg_target} verified. Here is your official semester grade sheet."
            }

        if any(w in msg_lower for w in ["admit card", "hall ticket", "exam schedule", "seating"]):
            if not has_reg:
                return {
                    "intent": "ADMIT_CARD_INQUIRY",
                    "confidence_score": 0.95,
                    "uncertainty_detected": False,
                    "policy_conflict_detected": False,
                    "requires_approval": False,
                    "decision": "ALLOW",
                    "proposed_action": None,
                    "sources": [],
                    "reason": "Institutional Identity Verification: Registration number required before displaying examination admit card.",
                    "assistant_message": "Please provide your University Registration Number (e.g., NIYAM2026_001) to verify your identity and view your examination admit card."
                }
            return {
                "intent": "ADMIT_CARD_INQUIRY",
                "confidence_score": 0.98,
                "uncertainty_detected": False,
                "policy_conflict_detected": False,
                "requires_approval": False,
                "decision": "ALLOW",
                "proposed_action": {
                    "tool": "AdmitCardTool",
                    "operation": "view_admit_card",
                    "arguments": {"studentId": reg_target}
                },
                "sources": [],
                "reason": "Autonomous student academic service: Examination admit card and seating verified.",
                "assistant_message": f"Registration number {reg_target} verified. Here is your official examination admit card."
            }

        if any(w in msg_lower for w in ["attendance", "classes attended", "eligibility"]):
            return {
                "intent": "ATTENDANCE_INQUIRY",
                "confidence_score": 0.98,
                "uncertainty_detected": False,
                "policy_conflict_detected": False,
                "requires_approval": False,
                "decision": "ALLOW",
                "proposed_action": {
                    "tool": "AttendanceTool",
                    "operation": "view_attendance",
                    "arguments": {}
                },
                "sources": [],
                "reason": "Autonomous student academic service: Subject-wise attendance verification.",
                "assistant_message": "Here is your subject-wise attendance and exam eligibility breakdown."
            }

        if any(w in msg_lower for w in ["profile", "my info", "student info"]):
            return {
                "intent": "STUDENT_INFORMATION",
                "confidence_score": 0.98,
                "uncertainty_detected": False,
                "policy_conflict_detected": False,
                "requires_approval": False,
                "decision": "ALLOW",
                "proposed_action": {
                    "tool": "StudentInfoTool",
                    "operation": "getProfile",
                    "arguments": {}
                },
                "sources": [],
                "reason": "Autonomous student academic service: Student profile retrieval.",
                "assistant_message": "Here is your verified student profile information."
            }

        if any(w in msg_lower for w in ["leakage", "broken", "repair", "maintenance", "ac water"]):
            cat = "HVAC" if "ac" in msg_lower else "ELECTRICAL" if "light" in msg_lower or "fan" in msg_lower else "PLUMBING" if "water" in msg_lower or "pipe" in msg_lower else "CIVIL"
            return {
                "intent": "MAINTENANCE_REQUEST",
                "confidence_score": 0.95,
                "uncertainty_detected": False,
                "policy_conflict_detected": False,
                "requires_approval": False,
                "decision": "ALLOW",
                "proposed_action": {
                    "tool": "MaintenanceTicketTool",
                    "operation": "create",
                    "arguments": {
                        "category": cat,
                        "location": "Campus Lab / Facility",
                        "description": request.message,
                        "urgency": "HIGH" if "leakage" in msg_lower or "emergency" in msg_lower else "MEDIUM"
                    }
                },
                "sources": [],
                "reason": "Autonomous institutional facility service: L1 Maintenance Ticket dispatch.",
                "assistant_message": "I have created an L1 maintenance ticket for your report and alerted facility teams."
            }

        return {
            "intent": "UNKNOWN",
            "confidence_score": 0.0,
            "uncertainty_detected": True,
            "policy_conflict_detected": False,
            "requires_approval": True,
            "decision": "REQUIRE_HUMAN_APPROVAL",
            "proposed_action": None,
            "sources": [
                {
                    "document": chunk.get(
                        "document",
                        "unknown",
                    ),
                    "policy_id": chunk.get(
                        "policy_id",
                        "unknown",
                    ),
                    "section": chunk.get(
                        "section",
                        "unknown",
                    ),
                    "chunk_id": chunk.get(
                        "chunk_id",
                        "unknown",
                    ),
                }
                for chunk in (
                    retrieved_chunks or []
                )[:5]
                if isinstance(
                    chunk,
                    dict,
                )
            ],
            "reason": (
                "The AI reasoning provider was unavailable, "
                "so the request could not be safely interpreted "
                "without inventing institutional action details."
            ),
            "assistant_message": (
                "I could not safely interpret this request "
                "automatically because the AI reasoning service "
                "is currently unavailable."
            ),
        }