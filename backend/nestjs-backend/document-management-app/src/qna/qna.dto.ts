import { IsString } from 'class-validator';

// Request DTO for querying
export class QueryRequestDto {
  @IsString()
  query: string;
}

// Response DTO for the answer
export class QueryResponseDto {
  @IsString()
  answer: string;
}
