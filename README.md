# doc-rag-qna-app
Fullstack Project - FastAPI, NestJS, and Angular

This project is a full-stack application that combines FastAPI for the Python backend, NestJS for the Node.js backend, and Angular for the frontend. It demonstrates how to manage documents, process queries, and serve dynamic content across multiple services.
Table of Contents

    Project Overview
    Technologies Used
    Project Structure
    Backend Setup
        FastAPI Setup
        NestJS Setup
    Frontend Setup
    Running the Project
    Testing
    Deployment
    Contributing
    License

Project Overview

This project consists of the following services:

    FastAPI (Python backend):
        Handles document ingestion, embeddings, and query processing.
    NestJS (Node.js backend):
        Manages users, documents, and interacts with the FastAPI backend to process queries.
    Angular (Frontend):
        Provides a user interface to interact with the backend, upload documents, and perform queries.

The system is designed to allow users to upload documents, process queries on these documents, and manage user data seamlessly.
Technologies Used

    FastAPI: High-performance API framework for Python.
    NestJS: Progressive Node.js framework for building efficient and scalable server-side applications.
    Angular: Platform for building single-page applications (SPAs) with TypeScript.
    Multer: Middleware for handling file uploads in NestJS.
    TypeORM: ORM for database interaction in NestJS.
    SQLAlchemy: ORM for database interaction in FastAPI.
    AWS S3 (Optional): Cloud storage for file management.
    Docker (Optional): Containerization of the application for easier deployment.

Project Structure

python-backend/
│
├── app.py                 # Main FastAPI application entry point
├── config.py              # Configuration settings (e.g., OpenAI API keys, paths, etc.)
├── models/                # Directory to store embeddings and FAISS vector stores
│   └── faiss_index/       # FAISS vector store (will be saved here after processing)
│
├── loaders/               # Module for document loading
│   ├── __init__.py        # Make loaders a package
│   └── document_loader.py # Document loader and processing logic
│
├── services/              # Services for embeddings creation, query handling, etc.
│   ├── __init__.py        # Make services a package
│   ├── embedding_service.py  # Handles embedding creation and storage
│   └── query_service.py      # Handles document queries and answer generation
│
├── utils/                 # Utility functions, e.g., for file handling
│   ├── __init__.py        # Make utils a package
│   └── file_utils.py      # File-related utilities (e.g., saving files, loading, etc.)
│
└── requirements.txt       # List of dependencies


src/
├── app.module.ts
├── main.ts
├── common/
│   ├── dto/
│   ├── filters/
│   ├── guards/
│   └── interceptors/
├── auth/
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── auth.controller.ts
│   ├── jwt.strategy.ts
│   └── local.strategy.ts
├── users/
│   ├── users.module.ts
│   ├── users.service.ts
│   └── users.controller.ts
├── documents/
│   ├── documents.module.ts
│   ├── documents.service.ts
│   ├── documents.controller.ts
│   ├── dto/
│   │   └── document-upload.dto.ts
│   ├── document.entity.ts
│   └── documents.service.spec.ts
├── qna/
│   ├── qna.module.ts
│   ├── qna.service.ts
│   ├── qna.controller.ts
│   └── qna.service.spec.ts
├── config/
│   ├── config.module.ts
│   ├── config.service.ts
│   └── config.interface.ts
├── utils/
│   └── file-upload.service.ts
└── shared/
    ├── constants.ts
    └── enums.ts


frontend/
├── e2e/                                    
├── src/
│   ├── app/
│   │   ├── auth/                           
│   │   ├── components/                     
│   │   ├── document/                       
│   │   ├── ingestion/                      
│   │   ├── qna/                            
│   │   ├── user/                           
│   │   ├── shared/                         
│   │   ├── app.component.ts                
│   │   ├── app.module.ts                   
│   │   └── app-routing.module.ts           
│   ├── assets/                             
│   ├── environments/                       
│   ├── styles/                             
├── angular.json                            
├── package.json                            
└── tsconfig.json                           



Backend Setup

1. FastAPI Setup

To set up the FastAPI backend, follow these steps:

    Create a Python virtual environment:

python -m venv venv

Activate the virtual environment:

    On Linux/macOS:

source venv/bin/activate

On Windows:

    venv\Scripts\activate

Install dependencies: Navigate to the fastapi/ directory and install the required Python packages:

pip install -r requirements.txt

Run FastAPI server: To start the FastAPI server, run:

    uvicorn app:app --reload

2. NestJS Setup

    Install Node.js dependencies: Navigate to the nestjs/ directory and install the dependencies:

npm install

Run NestJS server: To start the NestJS server, run:

    npm run start

3.Frontend Setup

    Install Angular CLI (if not already installed):

npm install -g @angular/cli

Install Angular dependencies: Navigate to the frontend/ directory and install the dependencies:

npm install

Run the Angular frontend: To start the Angular frontend, run:

    ng serve

    The application will be available at http://localhost:4200/.

Running the Project

To run the full-stack application, you need to run the FastAPI backend, the NestJS backend, and the Angular frontend concurrently. Here’s how you can do it:

    Start the FastAPI backend (in the backend/fastapi directory):

uvicorn app:app --reload

Start the NestJS backend (in the backend/nestjs directory):

npm run start

Start the Angular frontend (in the frontend directory):

    ng serve

Testing
1.Backend Tests

    NestJS Tests: To run unit tests for NestJS:

npm run test

2.FastAPI Tests: You can write and run tests for FastAPI using pytest. Install pytest first if needed:

pip install pytest

Then, run the tests:

    pytest

Deployment

You can deploy the entire project on cloud platforms like AWS, Google Cloud, or Heroku.

    Dockerization:
        Use Docker to containerize each service (FastAPI, NestJS, and Angular).
        Create separate Dockerfile for each service and use docker-compose to manage multi-container deployment.

    Cloud Storage (optional):
        If you're using cloud storage (e.g., AWS S3), configure the cloud SDK and set up the necessary environment variables.

Contributing

We welcome contributions to this project! To contribute:

    Fork the repository.
    Create a feature branch (git checkout -b feature-branch).
    Commit your changes (git commit -m 'Add new feature').
    Push to the branch (git push origin feature-branch).
    Open a Pull Request with a clear description of your changes.

License

This project is licensed under the MIT License - see the LICENSE file for details.