import { Module } from '@nestjs/common';
import { AssistantService } from './assistant.service';
import { AssistantController } from './assistant.controller';
import { CompanyModule } from '../company/company.module';
import { OpenAIModule } from '../openai/openai.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssistantMessage } from './entities/assistant_message.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [
    CompanyModule,
    OpenAIModule,
    AccountModule,
    TypeOrmModule.forFeature([AssistantMessage]),
    JwtModule.registerAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get('APP_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  controllers: [AssistantController],
  providers: [AssistantService],
})
export class AssistantModule {}
