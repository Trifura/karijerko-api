import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { OpenAIModule } from '../openai/openai.module';
import { ProfileModule } from '../profile/profile.module';
import { JwtModule } from '@nestjs/jwt';
import { AccountModule } from '../account/account.module';
import { CompanyModule } from '../company/company.module';

@Module({
  imports: [
    OpenAIModule,
    TypeOrmModule.forFeature([User]),
    ProfileModule,
    JwtModule,
    AccountModule,
    CompanyModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
