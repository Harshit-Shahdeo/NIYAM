from typing import Any
from pydantic import BaseModel, Field
from app.schemas.request import AgentUserDto
from app.schemas.response import Source


class PolicyResolutionResult(BaseModel):
    policy_ids: list[str] = Field(default_factory=list)
    requires_approval: bool = False
    authorities: list[str] = Field(default_factory=list)
    priorities: list[str] = Field(default_factory=lambda: ["NORMAL"])
    policy_conflict_detected: bool = False
    policy_context_text: str = ""
    sources: list[Source] = Field(default_factory=list)
    has_sufficient_evidence: bool = True
    suggested_intent: str = "LABORATORY_BOOKING"


class PolicyResolutionService:
    """Interprets retrieved policy chunks and extracts constraints, authorities, and conflict flags."""

    def resolve_policies(
        self,
        retrieved_chunks: list[dict[str, Any]],
        user: AgentUserDto,
        message: str,
    ) -> PolicyResolutionResult:
        msg_lower = message.lower()

        if not retrieved_chunks:
            return PolicyResolutionResult(
                policy_ids=[],
                requires_approval=True,
                authorities=["Admin"],
                policy_conflict_detected=False,
                policy_context_text="No policy context found for the query.",
                sources=[],
                has_sufficient_evidence=False,
                suggested_intent="UNKNOWN",
            )

        policy_ids: list[str] = []
        sources: list[Source] = []
        context_lines: list[str] = []

        requires_approval = False
        authorities: list[str] = []
        policy_conflict_detected = False

        for chunk in retrieved_chunks:
            meta = chunk.get("metadata") or {}
            content = chunk.get("content", "")
            doc_name = meta.get("source") or meta.get("document") or "NIYAM Policy Handbook"
            pol_id = meta.get("policy_id") or meta.get("id") or "POL-UNKNOWN"
            section = meta.get("section") or meta.get("title") or "General"
            chunk_id = chunk.get("id") or str(meta.get("chunk_id", ""))

            if pol_id not in policy_ids:
                policy_ids.append(pol_id)

            sources.append(
                Source(
                    document=doc_name,
                    policy_id=pol_id,
                    section=section,
                    chunk_id=chunk_id,
                )
            )

            context_lines.append(f"[{pol_id} - {section}]: {content}")

            content_lower = content.lower()
            if "approval" in content_lower or "permission" in content_lower or "authorization" in content_lower:
                requires_approval = True
                if "faculty" in content_lower and "Faculty" not in authorities:
                    authorities.append("Faculty")
                if "admin" in content_lower and "Admin" not in authorities:
                    authorities.append("Admin")
                if "supervisor" in content_lower and "Supervisor" not in authorities:
                    authorities.append("Supervisor")

        # Intent detection
        is_informational = any(
            phrase in msg_lower
            for phrase in [
                "what is the maximum",
                "what is the limit",
                "how long",
                "can i use a lab for more than",
                "policy on",
                "rules for",
                "tell me about",
            ]
        )

        suggested_intent = "POLICY_INQUIRY" if is_informational else "LABORATORY_BOOKING"

        # Check for duration constraint (>2 hours)
        is_extended_duration = any(
            term in msg_lower
            for term in ["3 hour", "3 hours", "three hours", "4 hours", "four hours", "more than two", "2 to 5"]
        )
        if is_extended_duration:
            requires_approval = True
            if "Faculty" not in authorities:
                authorities.append("Faculty")

        # Check for after-hours (>8 PM / 10 PM)
        is_after_hours = any(
            term in msg_lower
            for term in ["10 pm", "22:00", "after hours", "night", "late night", "23:00"]
        )
        if is_after_hours:
            requires_approval = True
            if "Admin" not in authorities:
                authorities.append("Admin")

        # Check for exam period constraints
        is_exam_period = "exam" in msg_lower or "exam week" in msg_lower or "examination" in msg_lower
        if is_exam_period:
            requires_approval = True
            policy_conflict_detected = True
            if "Faculty" not in authorities:
                authorities.append("Faculty")

        # Flag conflict when multiple distinct operational constraints interact
        if (is_after_hours and is_exam_period) or (is_extended_duration and is_after_hours):
            policy_conflict_detected = True

        if requires_approval and not authorities:
            authorities = ["Faculty", "Admin"]

        return PolicyResolutionResult(
            policy_ids=policy_ids,
            requires_approval=requires_approval,
            authorities=authorities,
            priorities=["HIGH"] if policy_conflict_detected else ["NORMAL"],
            policy_conflict_detected=policy_conflict_detected,
            policy_context_text="\n".join(context_lines),
            sources=sources,
            has_sufficient_evidence=len(retrieved_chunks) > 0,
            suggested_intent=suggested_intent,
        )
