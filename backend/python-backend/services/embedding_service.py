from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from typing import List
import os

# Path to store the FAISS index locally
FAISS_STORE_PATH = "models/faiss_index"


def create_embeddings_and_store(documents: List):
    """
    Create embeddings for the loaded documents and store them in a FAISS vector store.
    This function generates embeddings for each document, then stores them in a FAISS index for efficient similarity searches.

    Args:
        documents (List): A list of documents to embed.

    Returns:
        FAISS: The FAISS vector store containing the document embeddings.
    """
    try:
        # Use OpenAI embeddings to create embeddings from documents
        embeddings = OpenAIEmbeddings()

        # Create a FAISS vector store from the documents and their embeddings
        vector_store = FAISS.from_documents(documents, embeddings)

        # Save the FAISS index to the specified path
        vector_store.save_local(FAISS_STORE_PATH)
        print(f"FAISS index saved to {FAISS_STORE_PATH}")

        return vector_store

    except Exception as e:
        print(f"Error creating embeddings and storing in FAISS: {e}")
        raise e


def load_faiss_index():
    """
    Load the FAISS index from the local directory.
    
    Returns:
        FAISS: The loaded FAISS vector store.
    """
    try:
        # Load the FAISS index from the saved directory
        vector_store = FAISS.load_local(FAISS_STORE_PATH, OpenAIEmbeddings())
        print(f"FAISS index loaded from {FAISS_STORE_PATH}")
        return vector_store
    except Exception as e:
        print(f"Error loading FAISS index: {e}")
        raise e
