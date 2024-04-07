import { Module } from '@nestjs/common';
import { JobAdsService } from './job-ads.service';
import { JobAdsController } from './job-ads.controller';

@Module({
  controllers: [JobAdsController],
  providers: [JobAdsService],
})
export class JobAdsModule {}
