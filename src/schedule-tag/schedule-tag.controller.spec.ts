import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleTagController } from './schedule-tag.controller';
import { ScheduleTagService } from './schedule-tag.service';

describe('ScheduleTagController', () => {
  let controller: ScheduleTagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleTagController],
      providers: [ScheduleTagService],
    }).compile();

    controller = module.get<ScheduleTagController>(ScheduleTagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
