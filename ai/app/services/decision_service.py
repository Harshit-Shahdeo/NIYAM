from app.schemas.request import AgentReasonRequest
from app.schemas.response import AgentReasonResponse

from app.rag.retriever import retrieve_relevant_policies
from app.rag.context import build_policy_context

from app.policy.engine import analyze_policies

from app.services.llm_service import LLMService
from app.services.resource_service import ResourceService


class DecisionService:
    """
    Coordinates the NIYAM reasoning pipeline.

    Flow:
        Request
        -> Retrieve relevant policy chunks
        -> Parse policies
        -> Build policy context
        -> LLM reasoning
        -> Structured response
    """

    def __init__(self) -> None:
        self.llm_service = LLMService()
        self.resource_service = ResourceService()

    def process_reasoning_request(
        self,
        request: AgentReasonRequest,
    ) -> AgentReasonResponse:

        # 1. Build the retrieval query.
        query = request.message

        if request.conversation:
            recent_messages = " ".join(
                message.content
                for message in request.conversation[-4:]
            )

            query = f"{recent_messages} {request.message}"

        # 2. Retrieve relevant policy chunks.
        retrieved_chunks = retrieve_relevant_policies(
            query=query,
            limit=10,
        )

        # 3. Parse retrieved policies into structured data.
        policies = analyze_policies(retrieved_chunks)

        # 4. Build readable policy context.
        policy_context = build_policy_context(
            retrieved_chunks,
        )

        # 5. Build conversation context.
        conversation_context = ""

        if request.conversation:
            conversation_context = "\n".join(
                f"{message.role.upper()}: {message.content}"
                for message in request.conversation
            )

        # 5.1. Get available resources from backend.
        resources = self.resource_service.get_available_resources()

        # 6. Let the LLM reason over the request and policies.
        raw_response = self.llm_service.reason(
            request=request,
            policies=policies,
            policy_context=policy_context,
            conversation_context=conversation_context,
            retrieved_chunks=retrieved_chunks,
            resources=resources,
        )

        # 7. Convert the LLM output into the API response schema.
        return AgentReasonResponse(
            **raw_response,
        )