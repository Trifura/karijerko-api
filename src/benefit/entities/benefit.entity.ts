import { Entity } from 'typeorm';
import { BaseProperty } from '../../database/common/BaseProperty';

@Entity('benefit')
export class Benefit extends BaseProperty {}
