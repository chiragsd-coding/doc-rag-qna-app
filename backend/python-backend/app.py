from fastapi import FastAPI, File, UploadFile
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from PyPDF2 import PdfReader
import os
import uuid

app = FastAPI()

vectorstore = FAISS.load_local("faiss_store") if os.path.exists("faiss_store") else FAISS.from_texts([], OpenAIEmbeddings())

@app.post("/upload/")
async def upload_document(file: UploadFile = File(...)):
    file_id = str(uuid.uuid4())
    file_path = f"uploads/{file_id}_{file.filename}"
    with open(file_path, "wb") as f:
        f.write(await file.read())

    reader = PdfReader(file_path)
    text = "".join([page.extract_text() for page in reader.pages])
    
    vectorstore.add_texts([text])

    vectorstore.save_local("faiss_store")

    return {"message": "File uploaded and processed successfully", "file_id": file_id}

@app.post("/query/")
async def query_documents(query: str):
    results = vectorstore.similarity_search(query, k=3)

    return {"query": query, "results": [result.page_content for result in results]}
