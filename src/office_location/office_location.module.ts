import { Module } from '@nestjs/common';
import { OfficeLocationService } from './office_location.service';
import { OfficeLocationController } from './office_location.controller';

@Module({
  controllers: [OfficeLocationController],
  providers: [OfficeLocationService],
})
export class OfficeLocationModule {}
