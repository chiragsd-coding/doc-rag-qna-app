import pytest
from app.query_service import QueryService
from unittest.mock import MagicMock


@pytest.fixture
def mock_query_service():
    query_service = QueryService()
    query_service.query_document = MagicMock()
    return query_service


def test_query_service_answer(mock_query_service):
    # Simulating a query and checking the response
    mock_query_service.query_document.return_value = "This is a sample answer."
    result = mock_query_service.query_document("What is the capital of France?")
    assert result == "This is a sample answer."
    mock_query_service.query_document.assert_called_once_with("What is the capital of France?")


def test_no_answer_found(mock_query_service):
    # Simulating a query with no answer
    mock_query_service.query_document.return_value = None
    result = mock_query_service.query_document("Non-existent query")
    assert result is None
    mock_query_service.query_document.assert_called_once_with("Non-existent query")
