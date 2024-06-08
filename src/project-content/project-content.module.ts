import { Module } from '@nestjs/common';
import { ProjectContentService } from './project-content.service';
import { ProjectContentController } from './project-content.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectContent } from './entities/project-content.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectContent])],
  controllers: [ProjectContentController],
  providers: [ProjectContentService],
  exports: [ProjectContentService],
})
export class ProjectContentModule {}
