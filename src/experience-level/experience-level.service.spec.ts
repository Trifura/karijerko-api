import { Test, TestingModule } from '@nestjs/testing';
import { ExperienceLevelService } from './experience-level.service';

describe('ExperienceLevelService', () => {
  let service: ExperienceLevelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExperienceLevelService],
    }).compile();

    service = module.get<ExperienceLevelService>(ExperienceLevelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
