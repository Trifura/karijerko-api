import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { JobAdsModule } from './job-ads/job-ads.module';
import { PayRateModule } from './pay-rate/pay-rate.module';
import { LocationTypeModule } from './location-type/location-type.module';
import { JobTypeModule } from './job-type/job-type.module';
import { ScheduleTagModule } from './schedule-tag/schedule-tag.module';
import { SupplementalPayModule } from './supplemental-pay/supplemental-pay.module';
import { BenefitModule } from './benefit/benefit.module';
import { ExperienceLevelModule } from './experience-level/experience-level.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [join(process.cwd()), 'dist/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    JobAdsModule,
    PayRateModule,
    LocationTypeModule,
    JobTypeModule,
    ScheduleTagModule,
    SupplementalPayModule,
    BenefitModule,
    ExperienceLevelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
