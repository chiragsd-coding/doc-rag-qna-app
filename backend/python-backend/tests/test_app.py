import pytest
from fastapi.testclient import TestClient
from app.main import app  # Assuming the FastAPI app is located in app/main.py


@pytest.fixture
def client():
    return TestClient(app)


def test_user_creation(client):
    response = client.post("/api/users/", json={"name": "John", "email": "john@example.com", "password": "password123"})
    assert response.status_code == 201
    assert response.json()["name"] == "John"
    assert response.json()["email"] == "john@example.com"


def test_user_login(client):
    response = client.post("/api/login/", data={"email": "john@example.com", "password": "password123"})
    assert response.status_code == 200
    assert "access_token" in response.json()


def test_query_endpoint(client):
    response = client.post("/api/query/", json={"query": "What is the capital of France?"})
    assert response.status_code == 200
    assert response.json()["answer"] == "Paris"


def test_document_upload(client):
    file = {'file': ('test.txt', open('test.txt', 'rb'))}
    response = client.post("/api/upload/", files=file)
    assert response.status_code == 200
    assert response.json()["status"] == "Document uploaded successfully"
