// src/upload/upload.service.ts
import { Injectable } from '@nestjs/common';
import { unlink } from 'fs';
import { promisify } from 'util';
import { join } from 'path';

@Injectable()
export class UploadService {
  private readonly unlinkAsync = promisify(unlink);

  async deleteFile(filename: string): Promise<void> {
    const filePath = join(__dirname, '..', '..', 'uploads', filename);
    await this.unlinkAsync(filePath);
  }
}
