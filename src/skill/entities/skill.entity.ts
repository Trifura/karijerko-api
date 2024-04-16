import { Entity } from 'typeorm';
import { BaseProperty } from '../../database/common/BaseProperty';

@Entity('skill')
export class Skill extends BaseProperty {}
