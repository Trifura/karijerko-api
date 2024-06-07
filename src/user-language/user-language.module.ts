import { Module } from '@nestjs/common';
import { UserLanguageService } from './user-language.service';
import { UserLanguageController } from './user-language.controller';
import { UserLanguage } from './entities/user-language.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserLanguage]), JwtModule, AccountModule],
  controllers: [UserLanguageController],
  providers: [UserLanguageService],
})
export class UserLanguageModule {}
