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
    CompanyModule,
    CompanySizeModule,
    OfficeLocationModule,
    IndustryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
