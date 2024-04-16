import { Entity } from 'typeorm';
import { BaseProperty } from '../../database/common/BaseProperty';

@Entity('job_type')
export class JobType extends BaseProperty {}
