from fastapi import FastAPI
from pydantic import BaseModel


app = FastAPI(
    title="NIYAM AI Brain",
    version="0.1.0",
)


class AgentReasonRequest(BaseModel):
    request_id: str
    message: str
    user: dict
    conversation: list[dict] = []


class ProposedAction(BaseModel):
    tool: str
    operation: str
    arguments: dict


class Source(BaseModel):
    document: str
    section: str | None = None
    chunk_id: str | None = None


class AgentReasonResponse(BaseModel):
    intent: str
    confidence_score: float

    uncertainty_detected: bool
    policy_conflict_detected: bool
    requires_approval: bool

    decision: str

    proposed_action: ProposedAction | None

    sources: list[Source]

    reason: str


@app.get("/health")
def health():
    return {
        "service": "niyam-ai",
        "status": "ok",
    }


@app.post("/agent/reason", response_model=AgentReasonResponse)
def reason(request: AgentReasonRequest):

    # Temporary mock AI.
    # This will later be replaced by:
    # normalization → RAG → uncertainty detection → LLM reasoning.

    return AgentReasonResponse(
        intent="LABORATORY_BOOKING",
        confidence_score=0.95,

        uncertainty_detected=False,
        policy_conflict_detected=False,
        requires_approval=False,

        decision="ALLOW",

        proposed_action=ProposedAction(
            tool="LabBookingTool",
            operation="book",
            arguments={
                "resource": "robotics-lab",
                "date": "2026-08-19",
                "start": "14:00",
                "end": "16:00",
                "purpose": "project",
            },
        ),

        sources=[],

        reason="Mock AI decision.",
    )