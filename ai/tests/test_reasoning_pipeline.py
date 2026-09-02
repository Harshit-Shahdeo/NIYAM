import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


# Checklist Case 1: Duration >2h requires approval
def test_case_1_duration_over_limit():
    payload = {
        "request_id": "test-c1",
        "message": "Can I use a lab for three hours?",
        "user": {"id": "student_01", "role": "STUDENT"},
        "conversation": [],
    }
    res = client.post("/agent/reason", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["decision"] == "REQUIRE_HUMAN_APPROVAL"
    assert data["requires_approval"] is True


# Checklist Case 2: After-hours 10 PM requires approval
def test_case_2_after_hours():
    payload = {
        "request_id": "test-c2",
        "message": "I need the laboratory at 10 PM.",
        "user": {"id": "student_01", "role": "STUDENT"},
        "conversation": [],
    }
    res = client.post("/agent/reason", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["decision"] == "REQUIRE_HUMAN_APPROVAL"
    assert data["requires_approval"] is True


# Checklist Case 3: Exam period restriction
def test_case_3_exam_week():
    payload = {
        "request_id": "test-c3",
        "message": "Can students reserve labs during exam week?",
        "user": {"id": "student_01", "role": "STUDENT"},
        "conversation": [],
    }
    res = client.post("/agent/reason", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["decision"] == "REQUIRE_HUMAN_APPROVAL"
    assert data["requires_approval"] is True


# Checklist Case 4: Hinglish actionable booking
def test_case_4_hinglish_booking():
    payload = {
        "request_id": "test-c4",
        "message": "Mujhe kal 2 se 4 robotics lab chahiye project ke liye.",
        "user": {"id": "student_01", "role": "STUDENT", "department": "CSE", "year": 4},
        "conversation": [],
    }
    res = client.post("/agent/reason", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["intent"] == "LABORATORY_BOOKING"
    assert data["proposed_action"] is not None
    assert data["proposed_action"]["tool"] == "LabBookingTool"
    assert data["proposed_action"]["arguments"]["resource"] == "robotics-lab"
    assert data["proposed_action"]["arguments"]["start"] == "14:00"
    assert data["proposed_action"]["arguments"]["end"] == "16:00"


# Checklist Case 5: Informational question
def test_case_5_informational():
    payload = {
        "request_id": "test-c5",
        "message": "What is the maximum duration for a standard lab?",
        "user": {"id": "student_01", "role": "STUDENT"},
        "conversation": [],
    }
    res = client.post("/agent/reason", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["intent"] == "POLICY_INQUIRY"
    assert data["proposed_action"] is None


# Checklist Case 6: Conversation history follow-up
def test_case_6_conversation_history():
    payload = {
        "request_id": "test-c6",
        "message": "Book it from 2 to 4.",
        "user": {"id": "student_01", "role": "STUDENT"},
        "conversation": [
            {"role": "user", "content": "Can I book the robotics lab tomorrow?"},
            {"role": "assistant", "content": "What time would you like to book?"},
        ],
    }
    res = client.post("/agent/reason", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["decision"] == "ALLOW"
    assert data["proposed_action"] is not None
    assert data["proposed_action"]["arguments"]["resource"] == "robotics-lab"


# Checklist Case 7: Vague / ambiguous query
def test_case_7_vague_query():
    payload = {
        "request_id": "test-c7",
        "message": "Can you arrange that thing?",
        "user": {"id": "student_01", "role": "STUDENT"},
        "conversation": [],
    }
    res = client.post("/agent/reason", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["uncertainty_detected"] is True
    assert data["confidence_score"] <= 0.50
    assert data["proposed_action"] is None


# Maintenance Case 8: Routine maintenance request (English) -> ALLOW (autonomous)
def test_case_8_maintenance_normal():
    payload = {
        "request_id": "test-m1",
        "message": "The Robotics Lab AC is not working.",
        "user": {"id": "student_01", "role": "STUDENT"},
        "conversation": [],
    }
    res = client.post("/agent/reason", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["intent"] == "MAINTENANCE_REQUEST"
    assert data["decision"] == "ALLOW"
    assert data["requires_approval"] is False
    assert data["proposed_action"] is not None
    assert data["proposed_action"]["tool"] == "MaintenanceTicketTool"
    assert data["proposed_action"]["operation"] == "create"
    assert data["proposed_action"]["arguments"]["category"] == "HVAC"


# Maintenance Case 9: Routine Hinglish maintenance request -> ALLOW (autonomous)
def test_case_9_maintenance_hinglish():
    payload = {
        "request_id": "test-m2",
        "message": "Robotics lab ka AC kharab hai, maintenance request raise karo.",
        "user": {"id": "student_01", "role": "STUDENT"},
        "conversation": [],
    }
    res = client.post("/agent/reason", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["intent"] == "MAINTENANCE_REQUEST"
    assert data["decision"] == "ALLOW"
    assert data["requires_approval"] is False
    assert data["proposed_action"] is not None
    assert data["proposed_action"]["tool"] == "MaintenanceTicketTool"
    assert data["proposed_action"]["operation"] == "create"


# Maintenance Case 10: Low-risk civil maintenance -> ALLOW (autonomous)
def test_case_10_maintenance_low_risk():
    payload = {
        "request_id": "test-m3-low",
        "message": "Broken chair in classroom 101, please repair it.",
        "user": {"id": "student_01", "role": "STUDENT"},
        "conversation": [],
    }
    res = client.post("/agent/reason", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["intent"] == "MAINTENANCE_REQUEST"
    assert data["decision"] == "ALLOW"
    assert data["requires_approval"] is False
    assert data["proposed_action"] is not None
    assert data["proposed_action"]["tool"] == "MaintenanceTicketTool"
    assert data["proposed_action"]["arguments"]["urgency"] == "LOW"


# Maintenance Case 11: High-risk maintenance -> REQUIRE_HUMAN_APPROVAL (human approval)
def test_case_11_maintenance_high_risk():
    payload = {
        "request_id": "test-m4-high",
        "message": "Major robotics equipment damaged, urgent repair needed!",
        "user": {"id": "student_01", "role": "STUDENT"},
        "conversation": [],
    }
    res = client.post("/agent/reason", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["intent"] == "MAINTENANCE_REQUEST"
    assert data["decision"] == "REQUIRE_HUMAN_APPROVAL"
    assert data["requires_approval"] is True
    assert data["proposed_action"] is not None
    assert data["proposed_action"]["tool"] == "MaintenanceTicketTool"
    assert data["proposed_action"]["arguments"]["urgency"] == "HIGH"


# Maintenance Case 12: Emergency hazard -> REQUIRE_HUMAN_APPROVAL (human approval)
def test_case_12_maintenance_emergency():
    payload = {
        "request_id": "test-m5-emerg",
        "message": "Electrical sparking in Robotics Lab switchboard, emergency fix needed!",
        "user": {"id": "student_01", "role": "STUDENT"},
        "conversation": [],
    }
    res = client.post("/agent/reason", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["intent"] == "MAINTENANCE_REQUEST"
    assert data["decision"] == "REQUIRE_HUMAN_APPROVAL"
    assert data["requires_approval"] is True
    assert data["proposed_action"] is not None
    assert data["proposed_action"]["tool"] == "MaintenanceTicketTool"
    assert data["proposed_action"]["arguments"]["urgency"] == "EMERGENCY"
    assert data["proposed_action"]["arguments"]["category"] == "ELECTRICAL"


# Maintenance Case 13: Vague maintenance request -> uncertainty_detected = True
def test_case_13_maintenance_vague():
    payload = {
        "request_id": "test-m6-vague",
        "message": "Fix it maintenance",
        "user": {"id": "student_01", "role": "STUDENT"},
        "conversation": [],
    }
    res = client.post("/agent/reason", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["decision"] == "REQUIRE_HUMAN_APPROVAL"
    assert data["uncertainty_detected"] is True
    assert data["proposed_action"] is None


# Governance Case 14: No relevant policy evidence for consequential action -> REQUIRE_HUMAN_APPROVAL
def test_case_14_no_policy_evidence_consequential():
    payload = {
        "request_id": "test-c14-ungrounded",
        "message": "Special experimental nuclear propulsion facility overhaul required",
        "user": {"id": "student_01", "role": "STUDENT"},
        "conversation": [],
    }
    res = client.post("/agent/reason", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["decision"] == "REQUIRE_HUMAN_APPROVAL"
    assert data["uncertainty_detected"] is True
    assert data["proposed_action"] is None

# ERP Case 1: Complete ERP request -> ALLOW
def test_erp_case_1_complete():
    payload = {
        "request_id": "erp-c1",
        "message": "Show me my semester 5 result. My enrollment number is NIYAM2026001.",
        "user": {"id": "student_01", "role": "STUDENT"},
        "conversation": [],
    }
    res = client.post("/agent/reason", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["intent"] == "SEMESTER_RESULT"
    assert data["decision"] == "ALLOW"
    assert data["proposed_action"] is not None
    assert data["proposed_action"]["tool"] == "ERP"
    assert data["proposed_action"]["operation"] == "GET_SEMESTER_RESULT"
    assert data["proposed_action"]["arguments"]["enrollmentNumber"] == "NIYAM2026001"
    assert data["proposed_action"]["arguments"]["semester"] == 5

# ERP Case 2: Missing enrollment -> clarification
def test_erp_case_2_missing_enrollment():
    payload = {
        "request_id": "erp-c2",
        "message": "Show me my semester 5 result.",
        "user": {"id": "student_01", "role": "STUDENT"},
        "conversation": [],
    }
    res = client.post("/agent/reason", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["proposed_action"] is None
    assert data["uncertainty_detected"] is True

# ERP Case 3: Missing semester -> clarification
def test_erp_case_3_missing_semester():
    payload = {
        "request_id": "erp-c3",
        "message": "Show me my result. My enrollment number is NIYAM2026001.",
        "user": {"id": "student_01", "role": "STUDENT"},
        "conversation": [],
    }
    res = client.post("/agent/reason", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["proposed_action"] is None
    assert data["uncertainty_detected"] is True

# Document Case 1: Complete Admit Card request -> ALLOW
def test_document_case_1_complete():
    payload = {
        "request_id": "doc-c1",
        "message": "Generate my admit card for semester 5.",
        "user": {"id": "student_01", "role": "STUDENT"},
        "conversation": [],
    }
    res = client.post("/agent/reason", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["intent"] == "DOCUMENT_GENERATION"
    assert data["decision"] == "ALLOW"
    assert data["proposed_action"] is not None
    assert data["proposed_action"]["tool"] == "DOCUMENT"
    assert data["proposed_action"]["operation"] == "GENERATE_ADMIT_CARD"
    assert data["proposed_action"]["arguments"]["semester"] == 5
    assert "enrollmentNumber" not in data["proposed_action"]["arguments"]
    assert "userId" not in data["proposed_action"]["arguments"]
    assert "studentId" not in data["proposed_action"]["arguments"]

# Document Case 2: Missing semester -> clarification
def test_document_case_2_missing_semester():
    payload = {
        "request_id": "doc-c2",
        "message": "I need my admit card.",
        "user": {"id": "student_01", "role": "STUDENT"},
        "conversation": [],
    }
    res = client.post("/agent/reason", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["proposed_action"] is None
    assert data["uncertainty_detected"] is True

# Document Case 3: Invalid semester -> clarification
def test_document_case_3_invalid_semester():
    payload = {
        "request_id": "doc-c3",
        "message": "I need my admit card for semester -1.",
        "user": {"id": "student_01", "role": "STUDENT"},
        "conversation": [],
    }
    res = client.post("/agent/reason", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["proposed_action"] is None
    assert data["uncertainty_detected"] is True

# Document Result Case 1: Complete Result Download request -> ALLOW
def test_document_result_case_1_complete():
    payload = {
        "request_id": "doc-res-c1",
        "message": "Download my semester 5 result.",
        "user": {"id": "student_01", "role": "STUDENT"},
        "conversation": [],
    }
    res = client.post("/agent/reason", json=payload)
    assert res.status_code == 200
    data = res.json()
    # It might map to DOCUMENT_GENERATION depending on how the LLM interprets it, but we assert the tool/action
    assert data["decision"] == "ALLOW"
    assert data["proposed_action"] is not None
    assert data["proposed_action"]["tool"] == "DOCUMENT"
    assert data["proposed_action"]["operation"] == "GENERATE_RESULT"
    assert data["proposed_action"]["arguments"]["semester"] == 5
    assert "enrollmentNumber" not in data["proposed_action"]["arguments"]
    assert "userId" not in data["proposed_action"]["arguments"]

# Document Result Case 2: Missing semester -> clarification
def test_document_result_case_2_missing_semester():
    payload = {
        "request_id": "doc-res-c2",
        "message": "I want to download my result.",
        "user": {"id": "student_01", "role": "STUDENT"},
        "conversation": [],
    }
    res = client.post("/agent/reason", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["proposed_action"] is None
    assert data["uncertainty_detected"] is True

# Document Result Case 3: Invalid semester -> clarification
def test_document_result_case_3_invalid_semester():
    payload = {
        "request_id": "doc-res-c3",
        "message": "Download my semester -2 result.",
        "user": {"id": "student_01", "role": "STUDENT"},
        "conversation": [],
    }
    res = client.post("/agent/reason", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["proposed_action"] is None
    assert data["uncertainty_detected"] is True

# Document Result Case 4: Show result -> ERP (differentiation check)
def test_document_result_case_4_show_result():
    payload = {
        "request_id": "doc-res-c4",
        "message": "Show me my semester 5 result. My enrollment is NIYAM2026001.",
        "user": {"id": "student_01", "role": "STUDENT"},
        "conversation": [],
    }
    res = client.post("/agent/reason", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["decision"] == "ALLOW"
    assert data["proposed_action"] is not None
    assert data["proposed_action"]["tool"] == "ERP"
    assert data["proposed_action"]["operation"] == "GET_SEMESTER_RESULT"
    assert data["proposed_action"]["arguments"]["semester"] == 5
    assert data["proposed_action"]["arguments"]["enrollmentNumber"] == "NIYAM2026001"
