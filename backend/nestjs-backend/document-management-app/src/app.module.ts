import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DocumentsModule } from './documents/documents.module';
import { QnaModule } from './qna/qna.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    DocumentsModule,
    QnaModule,
    ConfigModule,
  ],
})
export class AppModule {}
