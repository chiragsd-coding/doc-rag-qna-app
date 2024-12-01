iimport { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

// Interface for the response from FastAPI
interface ProcessDocumentResponse {
  status: string;
  message?: string;
}

@Injectable()
export class PythonIntegrationService {
  private readonly pythonBackendUrl = 'http://localhost:8000/process_document'; // URL of the FastAPI backend

  /**
   * Send a document to the Python backend for processing.
   * @param documentPath - Path of the document to be processed.
   * @returns The response from the FastAPI backend.
   */
  async processDocument(documentPath: string): Promise<ProcessDocumentResponse> {
    try {
      // Send a POST request to the FastAPI backend with the document path
      const response = await axios.post(this.pythonBackendUrl, {
        documentPath: documentPath,
      });

      // If the response is successful, return the response data
      if (response.data && response.data.status === 'success') {
        return response.data;
      } else {
        // Handle failure response from FastAPI
        throw new InternalServerErrorException('Failed to process document with Python backend');
      }
    } catch (error) {
      console.error('Error processing document with Python backend:', error);
      throw new InternalServerErrorException('Error processing document');
    }
  }

  /**
   * Additional method to interact with the Python service if needed.
   * For example, you can add a method to trigger other FastAPI endpoints.
   */
  async additionalProcessing(inputData: any): Promise<any> {
    try {
      const response = await axios.post('http://localhost:8000/another_endpoint', inputData);
      return response.data;
    } catch (error) {
      console.error('Error with additional Python backend processing:', error);
      throw new InternalServerErrorException('Error with additional Python backend processing');
    }
  }
}
