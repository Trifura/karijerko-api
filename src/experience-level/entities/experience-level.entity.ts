import { Entity } from 'typeorm';
import { BaseProperty } from '../../database/common/BaseProperty';

@Entity('experience_level')
export class ExperienceLevel extends BaseProperty {}
