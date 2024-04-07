import { Module } from '@nestjs/common';
import { ExperienceLevelService } from './experience-level.service';
import { ExperienceLevelController } from './experience-level.controller';

@Module({
  controllers: [ExperienceLevelController],
  providers: [ExperienceLevelService],
})
export class ExperienceLevelModule {}
