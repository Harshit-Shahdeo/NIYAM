from typing import Any
from pydantic import BaseModel, Field
from app.schemas.request import AgentUserDto
from app.schemas.response import Source


class PolicyResolutionResult(BaseModel):
    """Structured policy evidence and metadata extracted from RAG retrieval."""
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
    """Extracts structured policy evidence, context, and metadata from retrieved chunks."""

    def resolve_policies(
        self,
        retrieved_chunks: list[dict[str, Any]],
        user: AgentUserDto,
        message: str,
    ) -> PolicyResolutionResult:
        # Handle empty retrieval / insufficient evidence explicitly (Refactoring Guide Section 5)
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
        authorities: list[str] = []

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
            if "faculty" in content_lower and "Faculty" not in authorities:
                authorities.append("Faculty")
            if "admin" in content_lower and "Admin" not in authorities:
                authorities.append("Admin")
            if "supervisor" in content_lower and "Supervisor" not in authorities:
                authorities.append("Supervisor")

        return PolicyResolutionResult(
            policy_ids=policy_ids,
            requires_approval=False,
            authorities=authorities or ["Faculty"],
            priorities=["NORMAL"],
            policy_conflict_detected=False,
            policy_context_text="\n".join(context_lines),
            sources=sources,
            has_sufficient_evidence=True,
            suggested_intent="LABORATORY_BOOKING",
        )
