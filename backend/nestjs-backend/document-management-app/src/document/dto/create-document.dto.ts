import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsInt()
  size?: number;

  @IsOptional()
  @IsString()
  mimetype?: string;
}
