import { Module } from '@nestjs/common';
import { CompanySizeService } from './company_size.service';
import { CompanySizeController } from './company_size.controller';

@Module({
  controllers: [CompanySizeController],
  providers: [CompanySizeService],
})
export class CompanySizeModule {}
