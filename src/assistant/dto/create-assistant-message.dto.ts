import { IsNotEmpty } from 'class-validator';

export class CreateAssistantMessageDto {
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  companyId: string;
}
