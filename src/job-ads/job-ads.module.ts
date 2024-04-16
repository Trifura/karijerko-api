import { Module } from '@nestjs/common';
import { JobAdsService } from './job-ads.service';
import { JobAdsController } from './job-ads.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobAd } from './entities/job-ad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobAd])],
  controllers: [JobAdsController],
  providers: [JobAdsService],
})
export class JobAdsModule {}
