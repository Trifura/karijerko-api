import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleTagService } from './schedule-tag.service';

describe('ScheduleTagService', () => {
  let service: ScheduleTagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduleTagService],
    }).compile();

    service = module.get<ScheduleTagService>(ScheduleTagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
