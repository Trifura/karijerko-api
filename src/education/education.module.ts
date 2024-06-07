import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { JwtModule } from '@nestjs/jwt';
import { AccountModule } from '../account/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Education } from './entities/education.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Education]), AccountModule, JwtModule],
  controllers: [EducationController],
  providers: [EducationService],
})
export class EducationModule {}
