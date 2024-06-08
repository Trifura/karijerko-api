import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { CompanyModule } from './company/company.module';
import { CompanySizeModule } from './company_size/company_size.module';
import { OfficeLocationModule } from './office_location/office_location.module';
import { IndustryModule } from './industry/industry.module';
import { AccountModule } from './account/account.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { OpenAIModule } from './openai/openai.module';
import { AssistantModule } from './assistant/assistant.module';
import { LanguageModule } from './language/language.module';
import { EducationModule } from './education/education.module';
import { ProfileModule } from './profile/profile.module';
import { ProjectModule } from './project/project.module';
import { SkillModule } from './skill/skill.module';
import { ProjectContentModule } from './project-content/project-content.module';
import { UserLanguageModule } from './user-language/user-language.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UploadModule } from './upload/upload.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
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
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAIL_HOST'),
          port: configService.get('MAIL_PORT'),
          secure: false, // upgrade later with STARTTLS
          auth: {
            user: configService.get('MAIL_USER'),
            pass: configService.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `"Karijerko" <${configService.get('MAIL_FROM')}>`,
        },
        template: {
          dir: join(__dirname, 'mail', 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    CompanyModule,
    CompanySizeModule,
    OfficeLocationModule,
    IndustryModule,
    AccountModule,
    UserModule,
    AuthModule,
    OpenAIModule,
    AssistantModule,
    LanguageModule,
    EducationModule,
    ProfileModule,
    ProjectModule,
    SkillModule,
    ProjectContentModule,
    UserLanguageModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
