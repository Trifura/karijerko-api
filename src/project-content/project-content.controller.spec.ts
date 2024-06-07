import { Test, TestingModule } from '@nestjs/testing';
import { ProjectContentController } from './project-content.controller';
import { ProjectContentService } from './project-content.service';

describe('ProjectContentController', () => {
  let controller: ProjectContentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectContentController],
      providers: [ProjectContentService],
    }).compile();

    controller = module.get<ProjectContentController>(ProjectContentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
