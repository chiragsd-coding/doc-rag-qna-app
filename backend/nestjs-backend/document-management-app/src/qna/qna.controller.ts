import { Body, Controller, Post } from '@nestjs/common';
import { QnaService } from './qna.service';
import { QueryRequestDto, QueryResponseDto } from './qna.dto';

@Controller('qna')
export class QnaController {
  constructor(private readonly qnaService: QnaService) {}

  @Post('query')
  async getAnswer(@Body() queryRequestDto: QueryRequestDto): Promise<QueryResponseDto> {
    const answer = await this.qnaService.getAnswer(queryRequestDto.query);
    return { answer };
  }
}
