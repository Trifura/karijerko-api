import { Entity } from 'typeorm';
import { BaseProperty } from '../../database/common/BaseProperty';

@Entity('schedule_tag')
export class ScheduleTag extends BaseProperty {}
