import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SupplementalPayService } from './supplemental-pay.service';
import { CreateSupplementalPayDto } from './dto/create-supplemental-pay.dto';
import { UpdateSupplementalPayDto } from './dto/update-supplemental-pay.dto';

@Controller('supplemental-pay')
export class SupplementalPayController {
  constructor(
    private readonly supplementalPayService: SupplementalPayService,
  ) {}

  @Post()
  create(@Body() createSupplementalPayDto: CreateSupplementalPayDto) {
    return this.supplementalPayService.create(createSupplementalPayDto);
  }

  @Get()
  findAll() {
    return this.supplementalPayService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplementalPayService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSupplementalPayDto: UpdateSupplementalPayDto,
  ) {
    return this.supplementalPayService.update(+id, updateSupplementalPayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplementalPayService.remove(+id);
  }
}
