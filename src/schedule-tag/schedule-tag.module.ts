import { Module } from '@nestjs/common';
import { ScheduleTagService } from './schedule-tag.service';
import { ScheduleTagController } from './schedule-tag.controller';

@Module({
  controllers: [ScheduleTagController],
  providers: [ScheduleTagService],
})
export class ScheduleTagModule {}
