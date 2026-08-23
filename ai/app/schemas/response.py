from typing import Any, Literal, Optional
from pydantic import BaseModel, Field


class ProposedAction(BaseModel):
    tool: str
    operation: str
    arguments: dict[str, Any] = Field(default_factory=dict)


class Source(BaseModel):
    document: str
    policy_id: Optional[str] = None
    section: Optional[str] = None
    chunk_id: Optional[str] = None


class AgentReasonResponse(BaseModel):
    intent: str
    confidence_score: float = Field(..., ge=0.0, le=1.0)
    uncertainty_detected: bool
    policy_conflict_detected: bool
    requires_approval: bool
    decision: Literal["ALLOW", "REQUIRE_HUMAN_APPROVAL", "REJECT"]
    proposed_action: Optional[ProposedAction] = None
    sources: list[Source] = Field(default_factory=list)
    reason: str
