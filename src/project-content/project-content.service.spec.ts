import { Test, TestingModule } from '@nestjs/testing';
import { ProjectContentService } from './project-content.service';

describe('ProjectContentService', () => {
  let service: ProjectContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectContentService],
    }).compile();

    service = module.get<ProjectContentService>(ProjectContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
