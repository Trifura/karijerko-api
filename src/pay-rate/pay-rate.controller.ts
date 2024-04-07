import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PayRateService } from './pay-rate.service';
import { CreatePayRateDto } from './dto/create-pay-rate.dto';
import { UpdatePayRateDto } from './dto/update-pay-rate.dto';

@Controller('pay-rate')
export class PayRateController {
  constructor(private readonly payRateService: PayRateService) {}

  @Post()
  create(@Body() createPayRateDto: CreatePayRateDto) {
    return this.payRateService.create(createPayRateDto);
  }

  @Get()
  findAll() {
    return this.payRateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payRateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePayRateDto: UpdatePayRateDto) {
    return this.payRateService.update(+id, updatePayRateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payRateService.remove(+id);
  }
}
