import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompanySizeService } from './company_size.service';
import { CreateCompanySizeDto } from './dto/create-company_size.dto';
import { UpdateCompanySizeDto } from './dto/update-company_size.dto';

@Controller('company-size')
export class CompanySizeController {
  constructor(private readonly companySizeService: CompanySizeService) {}

  @Post()
  create(@Body() createCompanySizeDto: CreateCompanySizeDto) {
    return this.companySizeService.create(createCompanySizeDto);
  }

  @Get()
  findAll() {
    return this.companySizeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companySizeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCompanySizeDto: UpdateCompanySizeDto,
  ) {
    return this.companySizeService.update(id, updateCompanySizeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companySizeService.remove(id);
  }
}
