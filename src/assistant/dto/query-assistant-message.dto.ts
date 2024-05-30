import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class QueryAssistantMessageDto {
  @IsNotEmpty()
  userId: number;

  @IsOptional()
  @IsUUID()
  companyId?: string;
}
