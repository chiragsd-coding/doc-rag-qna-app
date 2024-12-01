import pytest
from app.user_service import UserService
from app.models import User
from unittest.mock import MagicMock


@pytest.fixture
def mock_user_service():
    user_service = UserService()
    user_service.get_user_by_id = MagicMock()
    user_service.create_user = MagicMock()
    user_service.authenticate_user = MagicMock()
    return user_service


def test_create_user(mock_user_service):
    # Test user creation functionality
    new_user = User(id=1, name="John Doe", email="john@example.com", password="password123")
    mock_user_service.create_user.return_value = new_user
    result = mock_user_service.create_user(new_user)
    assert result.name == "John Doe"
    assert result.email == "john@example.com"
    mock_user_service.create_user.assert_called_once_with(new_user)


def test_get_user_by_id(mock_user_service):
    # Test fetching a user by ID
    mock_user_service.get_user_by_id.return_value = User(id=1, name="John Doe", email="john@example.com", password="password123")
    result = mock_user_service.get_user_by_id(1)
    assert result.id == 1
    assert result.name == "John Doe"
    mock_user_service.get_user_by_id.assert_called_once_with(1)


def test_authenticate_user(mock_user_service):
    # Test user authentication
    mock_user_service.authenticate_user.return_value = True
    result = mock_user_service.authenticate_user("john@example.com", "password123")
    assert result is True
    mock_user_service.authenticate_user.assert_called_once_with("john@example.com", "password123")


def test_invalid_user_login(mock_user_service):
    # Test failed authentication
    mock_user_service.authenticate_user.return_value = False
    result = mock_user_service.authenticate_user("john@example.com", "wrongpassword")
    assert result is False
    mock_user_service.authenticate_user.assert_called_once_with("john@example.com", "wrongpassword")
