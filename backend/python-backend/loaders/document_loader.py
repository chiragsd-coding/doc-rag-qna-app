import os
from langchain.document_loaders import PDFMinerLoader, TextLoader, UnstructuredFileLoader
from pathlib import Path
from typing import List

class DocumentLoader:
    def __init__(self, file_path: str):
        self.file_path = file_path
        self.file_extension = Path(file_path).suffix.lower()

    def load_document(self) -> List:
        """
        Load the document depending on its type (PDF, TXT, DOCX, etc.)
        """
        if self.file_extension == ".pdf":
            return self.load_pdf()
        elif self.file_extension == ".txt":
            return self.load_text()
        elif self.file_extension == ".docx":
            return self.load_docx()
        elif self.file_extension in [".html", ".htm"]:
            return self.load_html()
        else:
            raise ValueError(f"Unsupported file type: {self.file_extension}")

    def load_pdf(self) -> List:
        """
        Load a PDF document using PDFMinerLoader from LangChain.
        """
        print(f"Loading PDF document: {self.file_path}")
        loader = PDFMinerLoader(self.file_path)
        documents = loader.load()
        return documents

    def load_text(self) -> List:
        """
        Load a plain text document using TextLoader from LangChain.
        """
        print(f"Loading text document: {self.file_path}")
        loader = TextLoader(self.file_path)
        documents = loader.load()
        return documents

    def load_docx(self) -> List:
        """
        Load a DOCX document using UnstructuredFileLoader from LangChain.
        """
        print(f"Loading DOCX document: {self.file_path}")
        loader = UnstructuredFileLoader(self.file_path)
        documents = loader.load()
        return documents

    def load_html(self) -> List:
        """
        Load an HTML document using UnstructuredFileLoader from LangChain.
        """
        print(f"Loading HTML document: {self.file_path}")
        loader = UnstructuredFileLoader(self.file_path)
        documents = loader.load()
        return documents
