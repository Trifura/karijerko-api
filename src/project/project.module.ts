import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AccountModule } from '../account/account.module';
import { Project } from './entities/project.entity';
import { ProfileModule } from '../profile/profile.module';
import { ProjectContentModule } from '../project-content/project-content.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    JwtModule,
    AccountModule,
    ProfileModule,
    ProjectContentModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
