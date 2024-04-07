import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LocationTypeService } from './location-type.service';
import { CreateLocationTypeDto } from './dto/create-location-type.dto';
import { UpdateLocationTypeDto } from './dto/update-location-type.dto';

@Controller('location-type')
export class LocationTypeController {
  constructor(private readonly locationTypeService: LocationTypeService) {}

  @Post()
  create(@Body() createLocationTypeDto: CreateLocationTypeDto) {
    return this.locationTypeService.create(createLocationTypeDto);
  }

  @Get()
  findAll() {
    return this.locationTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationTypeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLocationTypeDto: UpdateLocationTypeDto,
  ) {
    return this.locationTypeService.update(+id, updateLocationTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationTypeService.remove(+id);
  }
}
