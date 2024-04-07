import { Module } from '@nestjs/common';
import { SupplementalPayService } from './supplemental-pay.service';
import { SupplementalPayController } from './supplemental-pay.controller';

@Module({
  controllers: [SupplementalPayController],
  providers: [SupplementalPayService],
})
export class SupplementalPayModule {}
