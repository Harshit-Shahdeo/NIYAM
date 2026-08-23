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
    assert isinstance(data["sources"], list)
    assert len(data["sources"]) > 0


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
    assert data["policy_conflict_detected"] is True
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
    assert len(data["sources"]) > 0


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
