import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExperienceLevelService } from './experience-level.service';
import { CreateExperienceLevelDto } from './dto/create-experience-level.dto';
import { UpdateExperienceLevelDto } from './dto/update-experience-level.dto';

@Controller('experience-level')
export class ExperienceLevelController {
  constructor(
    private readonly experienceLevelService: ExperienceLevelService,
  ) {}

  @Post()
  create(@Body() createExperienceLevelDto: CreateExperienceLevelDto) {
    return this.experienceLevelService.create(createExperienceLevelDto);
  }

  @Get()
  findAll() {
    return this.experienceLevelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.experienceLevelService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExperienceLevelDto: UpdateExperienceLevelDto,
  ) {
    return this.experienceLevelService.update(+id, updateExperienceLevelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.experienceLevelService.remove(+id);
  }
}
