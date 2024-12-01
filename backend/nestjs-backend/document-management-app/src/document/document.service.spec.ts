import { Test, TestingModule } from '@nestjs/testing';
import { DocumentService } from './document.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Document } from './document.entity';
import { Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import * as axios from 'axios';
import * as fs from 'fs';
import { CreateDocumentDto } from './dto/create-document.dto';

// Mocking dependencies
jest.mock('axios');
jest.mock('fs');

describe('DocumentService', () => {
  let service: DocumentService;
  let documentRepository: Repository<Document>;
  let axiosMock: jest.Mocked<typeof axios>;
  let fsMock: jest.Mocked<typeof fs>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentService,
        {
          provide: getRepositoryToken(Document),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<DocumentService>(DocumentService);
    documentRepository = module.get<Repository<Document>>(getRepositoryToken(Document));
    axiosMock = axios as jest.Mocked<typeof axios>;
    fsMock = fs as jest.Mocked<typeof fs>;

    // Mocking repository methods
    documentRepository.create = jest.fn().mockReturnValue({} as Document);
    documentRepository.save = jest.fn().mockResolvedValue({ id: '1' } as Document);
    documentRepository.find = jest.fn().mockResolvedValue([]);
    documentRepository.findOne = jest.fn().mockResolvedValue({ id: '1' } as Document);
    documentRepository.remove = jest.fn().mockResolvedValue({});
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('saveDocument', () => {
    it('should save the document and call the Python backend', async () => {
      const createDocumentDto: CreateDocumentDto = {
        title: 'Test Document',
        description: 'This is a test document',
      };
      const mockFile = { filename: 'test.pdf', size: 1024, mimetype: 'application/pdf' } as Express.Multer.File;
      
      // Mock the processing request to the Python backend
      axiosMock.post.mockResolvedValue({ data: { status: 'success' } });

      const savedDocument = await service.saveDocument(createDocumentDto, mockFile);

      expect(savedDocument).toBeDefined();
      expect(documentRepository.save).toHaveBeenCalled();
      expect(axiosMock.post).toHaveBeenCalledWith('http://localhost:8000/process_document', {
        documentPath: expect.any(String),
      });
    });

    it('should throw an error if saving document fails', async () => {
      const createDocumentDto: CreateDocumentDto = {
        title: 'Test Document',
        description: 'This is a test document',
      };
      const mockFile = { filename: 'test.pdf', size: 1024, mimetype: 'application/pdf' } as Express.Multer.File;
      
      // Mock a failure in document saving
      documentRepository.save.mockRejectedValueOnce(new Error('Database error'));

      await expect(service.saveDocument(createDocumentDto, mockFile)).rejects.toThrow(InternalServerErrorException);
    });

    it('should throw an error if Python backend processing fails', async () => {
      const createDocumentDto: CreateDocumentDto = {
        title: 'Test Document',
        description: 'This is a test document',
      };
      const mockFile = { filename: 'test.pdf', size: 1024, mimetype: 'application/pdf' } as Express.Multer.File;
      
      // Mock a successful save, but a failure in the Python backend
      axiosMock.post.mockRejectedValueOnce(new Error('Python backend error'));

      await expect(service.saveDocument(createDocumentDto, mockFile)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('getAllDocuments', () => {
    it('should return an array of documents', async () => {
      const documents = await service.getAllDocuments();
      expect(documents).toEqual([]);
      expect(documentRepository.find).toHaveBeenCalled();
    });

    it('should throw an error if retrieving documents fails', async () => {
      documentRepository.find.mockRejectedValueOnce(new Error('Database error'));
      await expect(service.getAllDocuments()).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('getDocumentById', () => {
    it('should return a document by ID', async () => {
      const document = await service.getDocumentById('1');
      expect(document).toBeDefined();
      expect(documentRepository.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw an error if document not found', async () => {
      documentRepository.findOne.mockResolvedValueOnce(null);
      await expect(service.getDocumentById('1')).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('deleteDocument', () => {
    it('should delete a document and remove the file from filesystem', async () => {
      const document = { id: '1', path: '/path/to/document.pdf' } as Document;
      documentRepository.findOne = jest.fn().mockResolvedValueOnce(document);
      
      await service.deleteDocument('1');
      
      expect(documentRepository.remove).toHaveBeenCalledWith(document);
      expect(fsMock.unlinkSync).toHaveBeenCalledWith(document.path);
    });

    it('should throw an error if document deletion fails', async () => {
      const document = { id: '1', path: '/path/to/document.pdf' } as Document;
      documentRepository.findOne = jest.fn().mockResolvedValueOnce(document);
      documentRepository.remove = jest.fn().mockRejectedValueOnce(new Error('Failed to delete'));

      await expect(service.deleteDocument('1')).rejects.toThrow(InternalServerErrorException);
    });
  });
});
