import { Entity } from 'typeorm';
import { BaseProperty } from '../../../common/BaseProperty';

@Entity('location_type')
export class LocationType extends BaseProperty {}
