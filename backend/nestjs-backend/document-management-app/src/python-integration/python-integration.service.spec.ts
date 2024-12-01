import { Test, TestingModule } from '@nestjs/testing';
import { PythonIntegrationService } from './python-integration.service';
import axios from 'axios';
import { InternalServerErrorException } from '@nestjs/common';

jest.mock('axios');

describe('PythonIntegrationService', () => {
  let service: PythonIntegrationService;
  let axiosMock: jest.Mocked<typeof axios>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PythonIntegrationService],
    }).compile();

    service = module.get<PythonIntegrationService>(PythonIntegrationService);
    axiosMock = axios as jest.Mocked<typeof axios>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('processDocument', () => {
    it('should send document to FastAPI and receive a success response', async () => {
      const documentPath = '/path/to/document.pdf';
      const mockResponse = { status: 'success', message: 'Document processed successfully' };

      axiosMock.post.mockResolvedValue({ data: mockResponse });

      const result = await service.processDocument(documentPath);

      expect(result.status).toBe('success');
      expect(axiosMock.post).toHaveBeenCalledWith('http://localhost:8000/process_document', {
        documentPath,
      });
    });

    it('should throw an error if FastAPI processing fails', async () => {
      const documentPath = '/path/to/document.pdf';
      axiosMock.post.mockRejectedValueOnce(new Error('Python backend error'));

      await expect(service.processDocument(documentPath)).rejects.toThrow(InternalServerErrorException);
    });
  });
});
