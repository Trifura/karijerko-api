import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplementalPayDto } from './create-supplemental-pay.dto';

export class UpdateSupplementalPayDto extends PartialType(
  CreateSupplementalPayDto,
) {}
