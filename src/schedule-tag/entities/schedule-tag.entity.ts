import { Entity } from 'typeorm';
import { BaseProperty } from '../../../common/BaseProperty';

@Entity('schedule_tag')
export class ScheduleTag extends BaseProperty {}
