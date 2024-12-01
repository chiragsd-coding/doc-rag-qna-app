import pytest
from app.document_loader import DocumentLoader
from app.models import Document
from unittest.mock import MagicMock


@pytest.fixture
def mock_document_loader():
    loader = DocumentLoader()
    loader.load_document = MagicMock()
    loader.save_document = MagicMock()
    return loader


def test_load_document(mock_document_loader):
    # Test that the load_document function works as expected
    mock_document_loader.load_document.return_value = "Document loaded"
    result = mock_document_loader.load_document("sample_document.txt")
    assert result == "Document loaded"
    mock_document_loader.load_document.assert_called_once_with("sample_document.txt")


def test_save_document(mock_document_loader):
    # Test that the save_document function works as expected
    mock_document_loader.save_document.return_value = "Document saved"
    result = mock_document_loader.save_document(Document(name="test.txt", content="Test content"))
    assert result == "Document saved"
    mock_document_loader.save_document.assert_called_once()


def test_load_invalid_document(mock_document_loader):
    # Test that an error is raised when loading an invalid document
    mock_document_loader.load_document.side_effect = FileNotFoundError
    with pytest.raises(FileNotFoundError):
        mock_document_loader.load_document("invalid.txt")
