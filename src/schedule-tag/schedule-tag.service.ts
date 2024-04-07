import { Injectable } from '@nestjs/common';
import { CreateScheduleTagDto } from './dto/create-schedule-tag.dto';
import { UpdateScheduleTagDto } from './dto/update-schedule-tag.dto';

@Injectable()
export class ScheduleTagService {
  create(createScheduleTagDto: CreateScheduleTagDto) {
    return 'This action adds a new scheduleTag';
  }

  findAll() {
    return `This action returns all scheduleTag`;
  }

  findOne(id: number) {
    return `This action returns a #${id} scheduleTag`;
  }

  update(id: number, updateScheduleTagDto: UpdateScheduleTagDto) {
    return `This action updates a #${id} scheduleTag`;
  }

  remove(id: number) {
    return `This action removes a #${id} scheduleTag`;
  }
}
