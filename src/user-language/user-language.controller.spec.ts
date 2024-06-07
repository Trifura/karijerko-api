import { Test, TestingModule } from '@nestjs/testing';
import { UserLanguageController } from './user-language.controller';
import { UserLanguageService } from './user-language.service';

describe('UserLanguageController', () => {
  let controller: UserLanguageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserLanguageController],
      providers: [UserLanguageService],
    }).compile();

    controller = module.get<UserLanguageController>(UserLanguageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
