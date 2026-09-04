# NIYAM

### Human-in-the-Loop Agentic AI for Autonomous Institutional Service Delivery

NIYAM is an AI-powered institutional service platform designed to move beyond the traditional policy chatbot model.

Instead of only answering questions, NIYAM understands a user's request, reasons about the required institutional workflow, selects the appropriate tool, verifies authorization, interacts with institutional data or services, and returns the result. Actions that require human oversight can be routed through an approval workflow.

Built as part of the **SOA Ideathon**.

---

## Live Demo

**Live application:** `ADD_YOUR_LIVE_SITE_URL_HERE`

> The demo credentials below are intended for testing the hosted demonstration environment.

---

## Demo Credentials

All demo accounts belong to the seeded **NIYAM Demo Institution** (`NIYAM-DEMO`). These credentials are taken directly from the project's seed data. fileciteturn26file0L23-L35

| Role | Email | Password | Purpose |
|---|---|---|---|
| Student | `student001@niyam.demo` | `student123` | Student self-service workflows |
| Student | `student002@niyam.demo` | `student123` | Test a second student's academic data |
| Faculty | `faculty001@niyam.demo` | `faculty123` | Faculty-level institutional access |
| Admin | `admin001@niyam.demo` | `admin123` | Administrative workflows and approvals |

The seed defines these passwords and accounts explicitly. fileciteturn26file0L6-L20 fileciteturn26file0L59-L84 fileciteturn26file0L171-L220

### Recommended demo account

For the main student-facing demo:

```text
Email:    student001@niyam.demo
Password: student123
```

This account is seeded with:

```text
Enrollment:  NIYAM2026001
Program:     B.Tech Computer Science and Engineering
Semester:    5
CGPA:        8.2
Attendance:  87.5%
SGPA:        8.4
```

The academic profile values come directly from the seed. fileciteturn26file0L88-L110

---

## What NIYAM Does

NIYAM provides an AI layer over institutional workflows and data.

### Student services

Students can interact with the system conversationally to perform or retrieve services such as:

- Semester result retrieval
- Result document generation
- Examination admit card generation
- Academic information retrieval
- Lab/resource booking
- Maintenance/service requests

### Institutional governance

NIYAM is designed around the principle that not every action should be treated equally.

- Lower-risk actions can be executed automatically.
- Higher-consequence actions can create a proposed action for authorized human approval.
- Actions are associated with authenticated users, institutions, and roles.
- Important operations can be audited and reviewed.

---

## Core Idea: Policy → Data → Action

NIYAM connects three layers that are often separated in institutional software.

```text
                  USER REQUEST
                       │
                       ▼
                AI / RAG REASONING
                       │
             ┌─────────┴─────────┐
             ▼                   ▼
       Institutional         ERP / DB
          Policy            Authoritative Data
             │                   │
             └─────────┬─────────┘
                       ▼
                TOOL SELECTION
                       │
                       ▼
                AUTHORIZATION
                       │
                       ▼
             INSTITUTIONAL ACTION
                       │
                       ▼
                  AUDIT TRAIL
                       │
                       ▼
                    RESULT
```

For example:

> **"Show my semester 5 result"**

1. The authenticated student's identity is obtained from the backend.
2. AI reasoning identifies the required academic operation.
3. The ERP tool retrieves the authoritative semester result.
4. The tool enforces student self-access authorization.
5. NIYAM returns the verified academic information.

For:

> **"Download my semester 5 result"**

NIYAM uses the document-generation workflow and produces a result document from verified ERP data.

The language model is therefore not treated as the source of truth for institutional records.

---

## Key Features

### Agentic service execution

NIYAM does not stop at generating text.

The AI layer can propose an institutional operation such as:

```json
{
  "tool": "ERP",
  "operation": "GET_SEMESTER_RESULT",
  "arguments": {
    "enrollmentNumber": "NIYAM2026001",
    "semester": 5
  }
}
```

The backend validates and executes that action through the registered institutional tool.

### Role-Based Access Control

Supported roles include:

- `STUDENT`
- `FACULTY`
- `ADMIN`

Student operations are particularly restrictive. A student cannot simply ask the AI to retrieve another student's academic record by changing an enrollment number. The backend resolves the authenticated student's authoritative profile and enforces self-access.

### Multi-tenancy

Institutional data is scoped using an `institutionId`, providing the foundation for serving multiple institutions while keeping institutional data separated.

### Human-in-the-loop approvals

For actions with higher consequences:

```text
User Request
     ↓
AI Reasoning
     ↓
Proposed Action
     ↓
Risk / Authorization Check
     ↓
Human Approval
     ↓
Execution
     ↓
Audit
```

### Auditability

Important actions can be recorded so institutional operations remain traceable and reviewable.

### Document generation

NIYAM can generate institutional documents from verified backend data, including:

- Semester result documents
- Examination admit cards

---

## Demo Workflows

### 1. View semester result

Log in with:

```text
student001@niyam.demo
student123
```

Then ask:

```text
Show my semester 5 result
```

Expected SGPA:

```text
8.4
```

### 2. Download semester result

Ask:

```text
Download my semester 5 result
```

NIYAM generates a result document using the student's verified academic data.

### 3. Generate examination admit card

Ask:

```text
Generate my semester 5 admit card
```

The seeded Semester 5 B.Tech CSE examination schedule contains five subjects. fileciteturn26file0L336-L364

| Course | Subject | Date | Time | Center |
|---|---|---|---|---|
| FMI301 | Fundamental Machine Intelligence | 2026-11-15 | 10:00 AM - 01:00 PM | Hall A, Main Block |
| IML302 | Introduction to Machine Learning | 2026-11-17 | 10:00 AM - 01:00 PM | Hall A, Main Block |
| CNW303 | Computer Networks | 2026-11-19 | 10:00 AM - 01:00 PM | Hall B, South Block |
| CPR304 | C Programming | 2026-11-21 | 02:00 PM - 05:00 PM | Lab Complex 1 |
| OSY305 | Operating System | 2026-11-24 | 10:00 AM - 01:00 PM | Hall A, Main Block |

### 4. Resource booking

Example:

```text
Book the robotics lab for my project work
```

NIYAM routes the request through the institutional resource/booking workflow, subject to configured authorization and approval rules.

The seeded demo includes a `robotics-lab` resource in the Engineering Block. fileciteturn26file0L225-L243

### 5. Maintenance request

Example:

```text
There is a problem with the projector in the lab. Create a maintenance request.
```

The request can be routed to the maintenance service instead of being treated as a simple conversational response.

---

## Architecture

NIYAM uses a layered architecture so AI reasoning is separated from authoritative institutional execution.

```text
┌──────────────────────────────────────────────┐
│                  Frontend                    │
│        Student Chat / Admin Dashboard       │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│                 NestJS API                   │
│                                              │
│  Auth / RBAC / Agent / Tools / Audit / Docs │
└───────────────┬──────────────────┬───────────┘
                │                  │
                ▼                  ▼
        ┌──────────────┐    ┌──────────────┐
        │  AI Service  │    │  PostgreSQL  │
        │ FastAPI      │    │  + Prisma    │
        │ RAG / LLM    │    │              │
        └──────┬───────┘    └──────────────┘
               │
               ▼
       ┌─────────────────┐
       │ Tool Selection   │
       │ & Proposed Action│
       └────────┬────────┘
                │
                ▼
       ┌─────────────────┐
       │ Tool Registry   │
       └────────┬────────┘
                │
        ┌───────┼────────┐
        ▼       ▼        ▼
      ERP    Booking  Maintenance
        │       │        │
        └───────┼────────┘
                ▼
        Institutional Data
                │
                ▼
             Audit
```

---

## Technology Stack

### Frontend

- Next.js
- React
- TypeScript
- Conversational student interface
- Administrative approval/dashboard interface

### Backend

- NestJS
- TypeScript
- Prisma
- PostgreSQL
- JWT authentication
- Role-based authorization
- Tool Registry / Dispatcher architecture
- Audit logging
- Scheduling
- Approval workflows
- PDF document generation

### AI Service

- Python
- FastAPI
- LLM-based reasoning
- RAG / policy retrieval
- Structured tool/action selection

### Documents

- `pdf-lib`
- Server-side document generation
- Temporary opaque download tokens

---

## AI and Tool Architecture

The AI layer is intentionally separated from domain execution.

```text
User
 ↓
Agent Controller
 ↓
Agent Service
 ↓
FastAPI AI Service
 ↓
LLM Reasoning
 ↓
Proposed Action
 ↓
Tool Registry
 ↓
Institutional Tool
 ↓
Prisma / Institutional Service
 ↓
Result
 ↓
Audit
 ↓
User
```

The language model chooses **what operation should be performed**, while the backend owns:

- Authentication
- Authorization
- Institution boundaries
- Data access
- Validation
- Domain logic
- Document generation
- Auditability

This separation keeps identity and institutional truth outside the model.

---

## Document Security

Generated documents use temporary opaque capability tokens rather than predictable public file paths.

```text
Authenticated User
       ↓
Document Tool
       ↓
Generate PDF
       ↓
Temporary Document Store
       ↓
Opaque Download Token
       ↓
Frontend Download Link
       ↓
Single-use Document Retrieval
```

Temporary document links expire and are consumed once.

---

## Demo Data

The seed creates the following institution and department:

```text
Institution:
NIYAM Demo Institution

Institution Code:
NIYAM-DEMO

Department:
Computer Science and Engineering

Department Code:
CSE
```

fileciteturn26file0L23-L57

### Student 001

```text
Name:       Demo Student
Email:      student001@niyam.demo
Enrollment: NIYAM2026001
Program:    B.Tech Computer Science and Engineering
Semester:   5
CGPA:       8.2
Attendance: 87.5%
SGPA:       8.4
```

Semester 5 result data includes five subjects. fileciteturn26file0L246-L285

| Course Code | Subject | Credits | Marks | Grade |
|---|---|---:|---:|---|
| FMI301 | Fundamental Machine Intelligence | 4 | 85 | A |
| IML302 | Introduction to Machine Learning | 4 | 82 | A |
| CNW303 | Computer Networks | 3 | 78 | B+ |
| CPR304 | C Programming | 3 | 91 | O |
| OSY305 | Operating System | 4 | 75 | B+ |

### Student 002

```text
Name:       Second Demo Student
Email:      student002@niyam.demo
Enrollment: NIYAM2026002
Program:    B.Tech Computer Science and Engineering
Semester:   5
CGPA:       7.4
Attendance: 76.5%
SGPA:       7.2
```

The second student's academic profile and result are also seeded independently. fileciteturn26file0L115-L165 fileciteturn26file0L291-L329

### Faculty

```text
Name:  Demo Faculty
Email: faculty001@niyam.demo
Role:  FACULTY
```

### Administrator

```text
Name:  Demo Administrator
Email: admin001@niyam.demo
Role:  ADMIN
```

---

## Running Locally

### Prerequisites

- Node.js
- npm
- Python 3
- PostgreSQL
- Git

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <YOUR_REPOSITORY_DIRECTORY>
```

### 2. Configure environment variables

Configure the environment for:

- PostgreSQL database connection
- JWT/authentication configuration
- AI service configuration
- LLM provider/API key
- Frontend API URL

Do not commit real secrets to the repository.

### 3. Install backend dependencies

```bash
cd backend
npm install
```

### 4. Generate Prisma client

```bash
npx prisma generate
```

### 5. Run database migrations

```bash
npx prisma migrate dev
```

### 6. Seed demo data

```bash
npx prisma db seed
```

The seed uses upserts for the demo records, so it can be used to initialize the demo database repeatedly.

### 7. Start the backend

```bash
npm run start:dev
```

### 8. Start the AI service

From the AI service directory, install the Python dependencies and start the FastAPI application according to the configured project entry point.

### 9. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Open the local frontend at the address shown by Next.js.

---

## Security Notes for the Public Demo

The credentials in this README are **demo credentials** and are intentionally public.

For a real institutional deployment:

- Do not use these passwords.
- Do not expose seed credentials publicly.
- Use strong password policies.
- Store secrets in environment variables or a secret manager.
- Keep institutional data isolated by tenant.
- Enforce authorization in the backend rather than relying on the AI model.
- Use production-grade document storage and access controls.
- Configure HTTPS and secure token/cookie handling.
- Review and retain audit logs according to institutional requirements.

The public demo should contain synthetic data only.

---

## Project Structure

```text
NIYAM/
├── frontend/
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── agent/
│   │   ├── tools/
│   │   │   ├── erp/
│   │   │   ├── document/
│   │   │   ├── student/
│   │   │   └── ...
│   │   ├── approvals/
│   │   ├── audit/
│   │   ├── documents/
│   │   ├── scheduling/
│   │   └── database/
│   │
│   └── prisma/
│       ├── schema.prisma
│       └── seed.ts
│
└── ai/
    ├── app/
    │   └── services/
    │       └── llm_service.py
    └── tests/
```

---

## Why NIYAM?

Traditional institutional software often forces users to navigate multiple portals, forms, policies, and departmental systems.

Traditional chatbots improve the interface, but often stop at answering questions.

NIYAM combines the two:

```text
Institutional Systems
        +
AI Reasoning
        +
Authorized Tool Execution
        +
Human Governance
        +
Auditability
        =
AI-Powered Institutional Service Delivery
```

The goal is not to replace institutional systems.

The goal is to put an intelligent, governed action layer on top of them.

---

## Team

Built by the NIYAM team for the **SOA Ideathon**.

---

## Status

NIYAM is a hackathon/prototype implementation demonstrating:

- Agentic institutional workflows
- Policy-aware reasoning
- RAG-based information access
- ERP integration
- Role-based access control
- Multi-tenant architecture
- Human-in-the-loop approvals
- Audit trails
- Resource booking
- Maintenance workflows
- Semester result retrieval
- Result document generation
- Examination admit card generation