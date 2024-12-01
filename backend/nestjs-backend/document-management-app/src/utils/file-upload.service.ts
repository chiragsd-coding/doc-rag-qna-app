import { Injectable } from '@nestjs/common';
import { Injectable, BadRequestException } from '@nestjs/common';
import * as multer from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './file.entity'; // Assuming you have a File entity for DB storage (optional)
import { createWriteStream, mkdirSync, existsSync } from 'fs';

@Injectable()
export class FileUploadService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  // Setting up the file storage configuration for multer
  private storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = './uploads'; // Specify the local directory to store files
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const fileExtName = extname(file.originalname);
      const fileName = `${Date.now()}${fileExtName}`;
      cb(null, fileName);
    },
  });

  // Custom file validation function (e.g., limit file type, size)
  private fileFilter(req, file, cb) {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']; // Allowed file types
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new BadRequestException('Invalid file type'), false);
    }
    cb(null, true);
  }

  // File upload configuration using multer
  public uploadFile() {
    return FileInterceptor('file', {
      storage: this.storage,
      limits: {
        fileSize: 10 * 1024 * 1024, // Max file size of 10MB
      },
      fileFilter: this.fileFilter,
    });
  }

  // Handling the uploaded file and saving it into a database (optional)
  async saveFileToDB(file: Express.Multer.File): Promise<File> {
    const newFile = this.fileRepository.create({
      filename: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    });

    return this.fileRepository.save(newFile);
  }

  // Optionally, handle further operations on the file, e.g., storing to cloud storage
  async handleCloudUpload(file: Express.Multer.File) {
    // Cloud storage logic (e.g., AWS S3, Google Cloud Storage)
    // You could use libraries like AWS SDK to upload files here
    // Example: uploadFileToS3(file);
  }
}
