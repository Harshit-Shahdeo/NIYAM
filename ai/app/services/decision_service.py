from typing import Any
from app.schemas.request import AgentReasonRequest
from app.schemas.response import AgentReasonResponse, ProposedAction, Source
from app.rag.retriever import retrieve_relevant_policies
from app.services.policy_resolution_service import PolicyResolutionService
from app.services.llm_service import LLMService


class DecisionService:
    """Master coordinator executing: RAG retrieval -> Policy Resolution -> LLM Reasoning -> Confidence Hierarchy -> Output Validation."""

    def __init__(self) -> None:
        self.policy_resolution_service = PolicyResolutionService()
        self.llm_service = LLMService()

    def process_reasoning_request(self, request: AgentReasonRequest) -> AgentReasonResponse:
        # Step 1: Query existing RAG retriever
        query_text = request.message
        if request.conversation:
            last_msgs = " ".join([m.content for m in request.conversation[-2:]])
            query_text = f"{last_msgs} {request.message}"

        retrieved_chunks = retrieve_relevant_policies(query_text, limit=5)

        # Step 2: Policy Resolution
        resolution = self.policy_resolution_service.resolve_policies(
            retrieved_chunks=retrieved_chunks,
            user=request.user,
            message=request.message,
        )

        # Step 3: Format conversation context
        conversation_context = ""
        if request.conversation:
            conversation_context = "\n".join(
                [f"{msg.role.upper()}: {msg.content}" for msg in request.conversation]
            )

        # Step 4: LLM Reasoning
        raw_decision = self.llm_service.reason(
            request=request,
            resolution=resolution,
            conversation_context=conversation_context,
        )

        # Step 5: Enforce Validation and Confidence Hierarchy
        return self._build_validated_response(raw_decision, resolution, request)

    def _build_validated_response(
        self,
        raw_decision: dict[str, Any],
        resolution: Any,
        request: AgentReasonRequest,
    ) -> AgentReasonResponse:
        intent = raw_decision.get("intent", resolution.suggested_intent)
        confidence = float(raw_decision.get("confidence_score", 0.85))
        uncertainty = bool(raw_decision.get("uncertainty_detected", False))
        policy_conflict = bool(raw_decision.get("policy_conflict_detected", resolution.policy_conflict_detected))
        requires_approval = bool(raw_decision.get("requires_approval", resolution.requires_approval))
        decision = raw_decision.get("decision", "ALLOW")
        reason = raw_decision.get("reason", "Request evaluated against institutional policy guidelines.")

        # Parse proposed_action
        raw_action = raw_decision.get("proposed_action")
        proposed_action: ProposedAction | None = None

        if isinstance(raw_action, dict) and raw_action.get("tool") and raw_action.get("operation"):
            tool = raw_action["tool"]
            operation = raw_action["operation"]
            arguments = raw_action.get("arguments", {})

            # Required parameters check for LabBookingTool
            if tool == "LabBookingTool" and operation == "book":
                has_all_params = all(
                    k in arguments and arguments[k]
                    for k in ["resource", "date", "start", "end"]
                )
                if has_all_params:
                    proposed_action = ProposedAction(
                        tool=tool,
                        operation=operation,
                        arguments=arguments,
                    )
                else:
                    uncertainty = True
                    proposed_action = None

        # Safety Rules
        # Rule A: If informational intent, force proposed_action = None
        if intent in ["POLICY_INQUIRY", "GENERAL_QUERY", "UNKNOWN"]:
            proposed_action = None

        # Rule B: If weak evidence or vague query, force proposed_action = None
        if uncertainty or (not resolution.has_sufficient_evidence and not request.conversation and len(request.message.split()) < 4):
            confidence = min(confidence, 0.50)
            uncertainty = True
            if decision == "ALLOW":
                decision = "REQUIRE_HUMAN_APPROVAL"
            proposed_action = None

        # Rule C: If requires approval is true, align decision
        if requires_approval and decision == "ALLOW":
            decision = "REQUIRE_HUMAN_APPROVAL"

        # Format sources
        sources: list[Source] = []
        raw_sources = raw_decision.get("sources")
        if isinstance(raw_sources, list) and raw_sources:
            for s in raw_sources:
                if isinstance(s, dict):
                    sources.append(
                        Source(
                            document=s.get("document", "NIYAM Policy Handbook"),
                            policy_id=s.get("policy_id"),
                            section=s.get("section"),
                            chunk_id=str(s.get("chunk_id")) if s.get("chunk_id") else None,
                        )
                    )
        elif resolution.sources:
            sources = resolution.sources

        return AgentReasonResponse(
            intent=intent,
            confidence_score=round(confidence, 2),
            uncertainty_detected=uncertainty,
            policy_conflict_detected=policy_conflict,
            requires_approval=requires_approval,
            decision=decision,
            proposed_action=proposed_action,
            sources=sources,
            reason=reason,
        )
