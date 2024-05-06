import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OfficeLocationService } from './office_location.service';
import { CreateOfficeLocationDto } from './dto/create-office_location.dto';
import { UpdateOfficeLocationDto } from './dto/update-office_location.dto';

@Controller('office-location')
export class OfficeLocationController {
  constructor(private readonly officeLocationService: OfficeLocationService) {}

  @Post()
  create(@Body() createOfficeLocationDto: CreateOfficeLocationDto) {
    return this.officeLocationService.create(createOfficeLocationDto);
  }

  @Get()
  findAll() {
    return this.officeLocationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.officeLocationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOfficeLocationDto: UpdateOfficeLocationDto,
  ) {
    return this.officeLocationService.update(+id, updateOfficeLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.officeLocationService.remove(+id);
  }
}
