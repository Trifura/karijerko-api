import { Controller, Get, Query } from '@nestjs/common';
import { LanguageService } from './language.service';
import { QueryLanguageDto } from './dto/query-language.dto';

@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Get()
  findAll(@Query() query: QueryLanguageDto) {
    return this.languageService.findAll(query);
  }
}
