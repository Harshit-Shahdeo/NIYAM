# ADR-002: Policy-Grounded AI Decision Architecture

- **Status:** Accepted
- **Date:** 2026-08-20
- **Decision:** Policy retrieval and deterministic policy evaluation will
  precede LLM reasoning.
- **Scope:** NIYAM AI/RAG and institutional decision pipeline

---

## 1. Context

NIYAM is an institutional AI governance and automation platform.

The system must be able to understand natural-language institutional
requests, retrieve the relevant institutional policies, reason about
those policies, and ultimately execute or reject institutional actions.

The NIYAM policy handbook is the authoritative mock institutional policy
corpus for the hackathon.

A simple:

    User Request → RAG → LLM → Tool

architecture was considered insufficient because semantic retrieval alone
does not determine how policies interact.

Institutional policies may:

- overlap;
- conflict;
- have different priorities;
- require human approval;
- impose immutable restrictions;
- contain resource-specific rules;
- contain general operational constraints.

Therefore, the system must distinguish between:

1. retrieving relevant policy information;
2. determining how applicable policies interact;
3. reasoning about the request;
4. enforcing the resulting decision.

---

## 2. Decision

NIYAM will use the following architecture:

    User Request
          |
          v
    Policy Retriever
          |
          v
    Relevant Policy Candidates
          |
          v
    Policy Engine
       /   |   \
      /    |    \
    conflict priority approval
      \     |     /
       \    |    /
          v
    Policy Context
          |
          v
         LLM
          |
          v
    Structured Decision
      /      |       \
   ALLOW  APPROVAL  REJECT
      \      |       /
       \     |      /
          NestJS
          |
          v
    Backend Validation
          |
          v
    Institutional Tool
          |
          v
    Database / State Change
          |
          v
        Audit

The LLM is therefore a reasoning component inside a constrained
institutional decision pipeline rather than the final authority over
institutional state.

---

## 3. Policy Retriever / RAG

The Policy Retriever is responsible for answering:

> "Which institutional policies are relevant to this request?"

The policy handbook will be ingested into PostgreSQL with pgvector.

Each policy chunk will contain enough metadata to identify its source,
including at minimum:

- policy ID;
- policy title;
- policy content;
- embedding.

The retriever will perform semantic similarity search and return the
most relevant policy candidates for the current request.

The retriever does NOT make the final institutional decision.

---

## 4. Policy Engine

The Policy Engine operates on the policies retrieved by the RAG layer.

Its responsibility is to determine how applicable policies interact.

The Policy Engine will handle:

- policy applicability;
- policy priority;
- policy conflicts;
- explicit prohibitions;
- approval requirements;
- higher-priority restrictions;
- construction of the policy context supplied to the LLM.

The Policy Engine does NOT replace the LLM's natural-language reasoning.

It provides the LLM with a constrained representation of the applicable
institutional rules.

---

## 5. Policy Priority and Conflict Resolution

When multiple policies apply, NIYAM must not rely solely on the LLM to
decide which policy has authority.

The Policy Engine will use the priority and precedence defined by the
NIYAM policy corpus.

Higher-priority restrictions take precedence over lower-priority
operational rules.

Examples include:

- emergency and life-safety restrictions;
- security and identity restrictions;
- examination restrictions;
- administrative overrides where explicitly permitted;
- resource-specific restrictions;
- department-specific policies;
- general operational booking rules.

The exact policy hierarchy remains defined by the NIYAM policy handbook.

---

## 6. Human Approval

A policy requiring authorization does not automatically constitute a
terminal prohibition.

Where the applicable policy requires human approval, the resulting
decision may be:

    REQUIRE_HUMAN_APPROVAL

The request must not be executed until the required approval has been
obtained.

The existing NIYAM approval workflow is responsible for recording and
processing such approvals.

If a policy defines an immutable prohibition, the resulting decision
must instead be:

    REJECT

and no institutional action may be executed.

---

## 7. LLM Responsibility

The LLM receives:

- the original user request;
- trusted user/context information;
- relevant retrieved policies;
- the Policy Engine's policy context.

The LLM produces a structured decision.

The supported decision states are:

    ALLOW
    REQUIRE_HUMAN_APPROVAL
    REJECT

The response may additionally contain:

- intent;
- confidence score;
- uncertainty information;
- policy conflict information;
- policy/source IDs;
- reasoning;
- proposed institutional action.

The LLM must not invent institutional policies.

The LLM must not independently modify institutional state.

---

## 8. Backend Enforcement

The NestJS backend remains the trusted institutional enforcement layer.

An LLM-generated ALLOW decision is a proposal for execution, not proof
that execution is valid.

Before execution, the backend independently validates:

- authenticated user identity;
- institutional context;
- authorization;
- resource existence;
- resource ownership/institution;
- scheduling constraints;
- availability;
- tool arguments;
- other relevant institutional invariants.

Only after backend validation succeeds may an institutional tool execute.

---

## 9. Institutional Tools

Institutional actions are performed through registered tools.

For example:

    LabBookingTool
        |
        v
    SchedulingService
        |
        v
    Booking database state

The AI does not directly access the database.

Tools operate using trusted execution context supplied by the backend,
including:

- user ID;
- institution ID;
- service request ID.

Values representing trusted institutional identity must not be taken
from untrusted AI output when they are already available from backend
context.

---

## 10. Scheduling

Scheduling is implemented as an institutional backend capability rather
than an LLM responsibility.

The SchedulingService is responsible for:

- validating requested time ranges;
- checking existing bookings;
- detecting conflicts;
- determining the next available slot;
- preventing overlapping bookings;
- creating confirmed bookings.

The LLM may propose a requested date/time, but the SchedulingService
remains authoritative for actual availability.

---

## 11. Auditability

NIYAM records the lifecycle of institutional requests through the
AuditService.

The audit trail may contain events including:

    REQUEST_RECEIVED
    AI_REASONING_STARTED
    AI_REASONING_COMPLETED
    ACTION_PROPOSED
    BOOKING_CREATED
    ACTION_EXECUTED
    REQUEST_COMPLETED
    REQUEST_FAILED

Approval and rejection flows are also expected to be auditable.

The audit trail exists independently of the LLM's own explanation and
records what the institutional backend actually did.

---

## 12. Failure and Uncertainty

If the policy corpus does not provide sufficient information to safely
determine a decision, NIYAM must not invent a policy.

The system should prefer a safe failure path such as:

    REQUIRE_HUMAN_APPROVAL

or another explicitly defined rejection/failure state depending on the
applicable policy.

Tool execution failures must be surfaced to the backend and recorded in
the service-request/audit lifecycle.

---

## 13. Rationale

This architecture was selected because it provides a useful separation
of responsibilities without introducing unnecessary complexity for the
hackathon.

    RAG
    → finds the relevant institutional knowledge.

    Policy Engine
    → determines how the applicable policies interact.

    LLM
    → interprets the request and produces a structured decision using
      the supplied policy context.

    NestJS
    → independently validates and enforces the decision.

    Institutional Tools
    → perform actual state changes.

    AuditService
    → records what happened.

This prevents NIYAM from becoming merely a chatbot with database access.

---

## 14. Alternatives Considered

### 14.1 LLM-only policy reasoning

    User → LLM → Tool

Rejected because the LLM would be responsible for retrieving,
interpreting, prioritizing, and enforcing institutional policy without a
deterministic policy boundary.

### 14.2 Basic RAG followed directly by LLM

    User → RAG → LLM → Tool

Rejected as the final architecture because retrieved policies may
conflict or require different levels of authority.

### 14.3 Fully deterministic rule engine

    User → Rules → Decision → Tool

Not selected because natural-language institutional requests require
language understanding and interpretation that is better handled by the
LLM.

### 14.4 Complex enterprise RAG architecture

Systems involving multiple retrieval engines, reranking services,
knowledge graphs, agentic retrieval, or distributed policy services
were intentionally not selected.

They are unnecessary for the current NIYAM hackathon scope.

---

## 15. Scope Constraint

This ADR describes the complete RAG and policy-decision architecture
planned for the NIYAM hackathon implementation.

The implementation should prioritize:

- correctness;
- explainability;
- policy grounding;
- deterministic enforcement boundaries;
- auditability;
- simplicity;
- demonstrability.

The system should not intentionally leave core RAG, policy retrieval,
precedence handling, or decision-flow capabilities for a later
hackathon phase.

Production-grade scaling, advanced retrieval optimization, distributed
architecture, and enterprise hardening are outside the current scope.

---

## 16. Resulting Architecture

The final conceptual pipeline is:

    User
      |
      v
    NestJS Agent API
      |
      v
    FastAPI AI Service
      |
      v
    Policy Retriever / RAG
      |
      v
    Relevant Policies
      |
      v
    Policy Engine
      |
      +---- conflict
      +---- priority
      +---- approval
      +---- restrictions
      |
      v
    Policy Context
      |
      v
    LLM Reasoner
      |
      v
    Structured Decision
      |
      +----------+----------+
      |          |          |
    ALLOW     APPROVAL    REJECT
      |          |          |
      v          v          v
   Backend    Approval     Stop
  validation   workflow
      |
      v
 Institutional Tool
      |
      v
 Database State Change
      |
      v
 Audit Trail