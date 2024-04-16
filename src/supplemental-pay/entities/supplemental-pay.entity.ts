import { Entity } from 'typeorm';
import { BaseProperty } from '../../database/common/BaseProperty';

@Entity('supplemental_pay')
export class SupplementalPay extends BaseProperty {}
