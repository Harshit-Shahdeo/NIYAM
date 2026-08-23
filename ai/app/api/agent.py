from fastapi import APIRouter, Depends
from app.schemas.request import AgentReasonRequest
from app.schemas.response import AgentReasonResponse
from app.services.decision_service import DecisionService

router = APIRouter(prefix="/agent", tags=["Agent Reasoning"])

_decision_service: DecisionService | None = None


def get_decision_service() -> DecisionService:
    global _decision_service
    if _decision_service is None:
        _decision_service = DecisionService()
    return _decision_service


@router.post("/reason", response_model=AgentReasonResponse)
def reason(
    request: AgentReasonRequest,
    decision_service: DecisionService = Depends(get_decision_service),
) -> AgentReasonResponse:
    """Core reasoning endpoint: executes RAG search, policy resolution, and LLM reasoning."""
    return decision_service.process_reasoning_request(request)
