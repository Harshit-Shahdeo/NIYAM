from typing import Any, Optional

from pydantic import BaseModel, Field


class AgentUserDto(BaseModel):
    id: str
    role: str
    department: Optional[str] = None
    year: Optional[int] = None


class ConversationMessage(BaseModel):
    role: str
    content: str


class AgentReasonRequest(BaseModel):
    request_id: str
    message: str

    user: AgentUserDto

    conversation: list[ConversationMessage] = Field(
        default_factory=list,
    )

    student_context: Optional[dict[str, Any]] = None