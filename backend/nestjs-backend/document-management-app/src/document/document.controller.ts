import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { DocumentService } from './document.service';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  async uploadDocument(@Body() documentData: { title: string, file_path: string }) {
    return this.documentService.create(documentData);
  }

  @Get()
  async getAllDocuments() {
    return this.documentService.findAll();
  }

  @Get(':id')
  async getDocument(@Param('id') id: number) {
    return this.documentService.findOne(id);
  }
}
