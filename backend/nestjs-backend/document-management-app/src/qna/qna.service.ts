import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class QnaService {
  private readonly queryApiUrl = 'http://localhost:8000/query'; // FastAPI URL

  async getAnswer(query: string): Promise<string> {
    try {
      const response = await axios.post(this.queryApiUrl, { query });

      if (response.data && response.data.answer) {
        return response.data.answer;
      } else {
        throw new InternalServerErrorException('No answer received from the backend');
      }
    } catch (error) {
      console.error('Error while querying the backend:', error);
      throw new InternalServerErrorException('Failed to communicate with the document query backend');
    }
  }
}
