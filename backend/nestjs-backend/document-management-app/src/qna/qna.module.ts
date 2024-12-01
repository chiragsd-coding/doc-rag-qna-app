import { Module } from '@nestjs/common';
import { QnaService } from './qna.service';
import { QnaController } from './qna.controller';

@Module({
  imports: [],
  controllers: [QnaController],
  providers: [QnaService],
})
export class QnaModule {}
