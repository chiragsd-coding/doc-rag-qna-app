import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class PythonIntegrationService {
  constructor(private httpService: HttpService) {}

  async sendDocumentToPythonBackend(documentPath: string): Promise<any> {
    const response = await this.httpService
      .post('http://python-backend-url/upload', { filePath: documentPath })
      .toPromise();
    return response.data;
  }
}
