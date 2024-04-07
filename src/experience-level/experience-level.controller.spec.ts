import { Test, TestingModule } from '@nestjs/testing';
import { ExperienceLevelController } from './experience-level.controller';
import { ExperienceLevelService } from './experience-level.service';

describe('ExperienceLevelController', () => {
  let controller: ExperienceLevelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExperienceLevelController],
      providers: [ExperienceLevelService],
    }).compile();

    controller = module.get<ExperienceLevelController>(
      ExperienceLevelController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
