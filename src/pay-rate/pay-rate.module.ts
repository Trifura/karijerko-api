import { Module } from '@nestjs/common';
import { PayRateService } from './pay-rate.service';
import { PayRateController } from './pay-rate.controller';

@Module({
  controllers: [PayRateController],
  providers: [PayRateService],
})
export class PayRateModule {}
