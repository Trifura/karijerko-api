// src/upload/upload.dto.ts
import { IsNotEmpty } from 'class-validator';

export class UploadDto {
  @IsNotEmpty()
  file: any;
}
