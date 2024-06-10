import { IsNotEmpty } from 'class-validator';

export class CreateGeneralMessageDto {
  @IsNotEmpty()
  content: string;
}
