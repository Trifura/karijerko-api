import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { MetadataService } from './metadata.service';

@Controller('metadata')
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) {}

  @Get('fetch')
  async fetchMetadata(@Query('url') url: string) {
    if (!url) {
      throw new BadRequestException('URL is required');
    }

    return await this.metadataService.fetchMetadata(url);
  }
}
