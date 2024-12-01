import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document.entity';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import { CreateDocumentDto } from './dto/create-document.dto';

@Injectable()
export class DocumentService {
  private readonly uploadDir = path.join(__dirname, '..', '..', 'uploads'); // Directory where documents will be saved
  private readonly pythonBackendUrl = 'http://localhost:8000/process_document'; // FastAPI endpoint to process documents (embedding, etc.)

  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
  ) {}

  /**
   * Save the document metadata and process the document.
   * @param createDocumentDto - The data transfer object containing document details.
   * @param file - The document file to be uploaded.
   * @returns The saved document with its metadata.
   */
  async saveDocument(createDocumentDto: CreateDocumentDto, file: Express.Multer.File): Promise<Document> {
    const documentPath = path.join(this.uploadDir, file.filename);

    // Save the document metadata in the database
    const document = this.documentRepository.create({
      ...createDocumentDto,
      path: documentPath,
      filename: file.filename,
      size: file.size,
      mimetype: file.mimetype,
    });

    try {
      const savedDocument = await this.documentRepository.save(document);

      // Optionally, send the document to the Python backend for processing (e.g., generating embeddings)
      await this.processDocumentWithPythonBackend(savedDocument);

      return savedDocument;
    } catch (error) {
      console.error('Error saving document:', error);
      throw new InternalServerErrorException('Failed to save document');
    }
  }

  /**
   * Process the document using the Python backend (e.g., generate embeddings).
   * @param document - The saved document metadata.
   */
  async processDocumentWithPythonBackend(document: Document): Promise<void> {
    try {
      // Send a request to FastAPI to process the document (e.g., extract text or generate embeddings)
      const response = await axios.post(this.pythonBackendUrl, {
        documentPath: document.path,
      });

      // Handle the response from the Python backend if necessary
      if (response.data && response.data.status === 'success') {
        console.log(`Document ${document.filename} processed successfully.`);
      } else {
        throw new InternalServerErrorException('Failed to process document with Python backend');
      }
    } catch (error) {
      console.error('Error processing document with Python backend:', error);
      throw new InternalServerErrorException('Error processing document');
    }
  }

  /**
   * Get the list of all documents.
   * @returns An array of documents from the database.
   */
  async getAllDocuments(): Promise<Document[]> {
    try {
      return await this.documentRepository.find();
    } catch (error) {
      console.error('Error retrieving documents:', error);
      throw new InternalServerErrorException('Failed to retrieve documents');
    }
  }

  /**
   * Get a single document by its ID.
   * @param id - The document ID.
   * @returns The document if found.
   */
  async getDocumentById(id: string): Promise<Document> {
    try {
      const document = await this.documentRepository.findOne(id);
      if (!document) {
        throw new InternalServerErrorException(`Document with ID ${id} not found`);
      }
      return document;
    } catch (error) {
      console.error('Error retrieving document by ID:', error);
      throw new InternalServerErrorException('Failed to retrieve document');
    }
  }

  /**
   * Delete a document by its ID.
   * @param id - The document ID.
   * @returns A boolean indicating whether the deletion was successful.
   */
  async deleteDocument(id: string): Promise<boolean> {
    try {
      const document = await this.getDocumentById(id); // Ensure document exists before deletion
      await this.documentRepository.remove(document);
      fs.unlinkSync(document.path); // Remove the file from the filesystem
      console.log(`Document ${id} deleted successfully`);
      return true;
    } catch (error) {
      console.error('Error deleting document:', error);
      throw new InternalServerErrorException('Failed to delete document');
    }
  }
}
