# doc-rag-qna-app
1)Run the Python Backend (Document Ingestion & Q&A):

    python app.py
    Ensure that the document ingestion endpoint (/ingest) and query endpoint (/query) are accessible.

2)Run the NestJS Backend (User & Document Management):

    npm run start
    Ensure the user authentication and document management endpoints (/documents, /auth/login) are functional.

3)Run the Angular Frontend:

    ng serve
    Ensure the frontend is correctly calling the backend APIs.