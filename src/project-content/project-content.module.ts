import { Module } from '@nestjs/common';
import { ProjectContentService } from './project-content.service';
import { ProjectContentController } from './project-content.controller';

@Module({
  controllers: [ProjectContentController],
  providers: [ProjectContentService],
})
export class ProjectContentModule {}
