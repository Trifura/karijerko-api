import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { Company } from './entities/company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndustryModule } from '../industry/industry.module';
import { CompanySizeModule } from '../company_size/company_size.module';
import { JwtModule } from '@nestjs/jwt';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company]),
    IndustryModule,
    CompanySizeModule,
    JwtModule,
    AccountModule,
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
