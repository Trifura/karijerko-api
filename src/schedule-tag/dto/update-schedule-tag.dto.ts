import { PartialType } from '@nestjs/mapped-types';
import { CreateScheduleTagDto } from './create-schedule-tag.dto';

export class UpdateScheduleTagDto extends PartialType(CreateScheduleTagDto) {}
