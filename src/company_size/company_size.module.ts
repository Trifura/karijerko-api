import { Module } from '@nestjs/common';
import { CompanySizeService } from './company_size.service';
import { CompanySizeController } from './company_size.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanySize } from './entities/company_size.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanySize])],
  controllers: [CompanySizeController],
  providers: [CompanySizeService],
  exports: [CompanySizeService],
})
export class CompanySizeModule {}
