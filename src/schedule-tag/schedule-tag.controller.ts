import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ScheduleTagService } from './schedule-tag.service';
import { CreateScheduleTagDto } from './dto/create-schedule-tag.dto';
import { UpdateScheduleTagDto } from './dto/update-schedule-tag.dto';

@Controller('schedule-tag')
export class ScheduleTagController {
  constructor(private readonly scheduleTagService: ScheduleTagService) {}

  @Post()
  create(@Body() createScheduleTagDto: CreateScheduleTagDto) {
    return this.scheduleTagService.create(createScheduleTagDto);
  }

  @Get()
  findAll() {
    return this.scheduleTagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scheduleTagService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateScheduleTagDto: UpdateScheduleTagDto,
  ) {
    return this.scheduleTagService.update(+id, updateScheduleTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scheduleTagService.remove(+id);
  }
}
