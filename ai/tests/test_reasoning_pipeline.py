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
