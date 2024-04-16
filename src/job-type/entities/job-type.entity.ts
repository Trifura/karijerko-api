import { Entity } from 'typeorm';
import { BaseProperty } from '../../../common/BaseProperty';

@Entity('job_type')
export class JobType extends BaseProperty {}
