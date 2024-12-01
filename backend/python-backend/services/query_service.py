from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.chains import RetrievalQA
from transformers import GPT2LMHeadModel, GPT2Tokenizer
from typing import Optional
import os

# Path to the FAISS index
FAISS_STORE_PATH = "models/faiss_index"


def load_faiss_index() -> FAISS:
    """
    Load the FAISS index from the saved directory.

    Returns:
        FAISS: The loaded FAISS vector store.
    """
    try:
        # Load the FAISS index from the local directory
        vector_store = FAISS.load_local(FAISS_STORE_PATH, OpenAIEmbeddings())
        print(f"FAISS index loaded from {FAISS_STORE_PATH}")
        return vector_store
    except Exception as e:
        print(f"Error loading FAISS index: {e}")
        raise e


def process_query(query: str) -> str:
    """
    Process the query and retrieve an answer based on the FAISS vector store.

    Args:
        query (str): The query string from the user.

    Returns:
        str: The answer based on the query.
    """
    try:
        # Load the FAISS index
        vector_store = load_faiss_index()

        # Use the vector store for similarity search
        search_results = vector_store.similarity_search(query, k=3)  # Retrieve top 3 results

        # Extract relevant document content from the results
        context = " ".join([result['text'] for result in search_results])

        # Use a language model (e.g., GPT-2) for answering the query based on the context
        answer = generate_answer_from_context(query, context)

        return answer
    except Exception as e:
        print(f"Error processing query: {e}")
        raise e


def generate_answer_from_context(query: str, context: str) -> str:
    """
    Generate an answer using a pre-trained language model (e.g., GPT-2) based on the context.

    Args:
        query (str): The user's query.
        context (str): The context retrieved from the similarity search in FAISS.

    Returns:
        str: The generated answer.
    """
    try:
        # Load GPT-2 model and tokenizer for answer generation
        model = GPT2LMHeadModel.from_pretrained("gpt2")
        tokenizer = GPT2Tokenizer.from_pretrained("gpt2")

        # Prepare the input text for the model (concatenate query with context)
        input_text = f"Question: {query}\nContext: {context}\nAnswer:"

        # Tokenize the input text
        inputs = tokenizer(input_text, return_tensors="pt", truncation=True, padding=True)

        # Generate the output answer
        outputs = model.generate(inputs['input_ids'], max_length=200, num_return_sequences=1)
        answer = tokenizer.decode(outputs[0], skip_special_tokens=True)

        # Clean the generated answer
        answer = answer.split("Answer:")[1].strip()

        return answer
    except Exception as e:
        print(f"Error generating answer: {e}")
        raise e
