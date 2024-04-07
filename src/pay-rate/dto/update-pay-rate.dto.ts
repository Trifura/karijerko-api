import { PartialType } from '@nestjs/mapped-types';
import { CreatePayRateDto } from './create-pay-rate.dto';

export class UpdatePayRateDto extends PartialType(CreatePayRateDto) {}
