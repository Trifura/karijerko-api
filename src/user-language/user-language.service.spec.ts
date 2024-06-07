import { Test, TestingModule } from '@nestjs/testing';
import { UserLanguageService } from './user-language.service';

describe('UserLanguageService', () => {
  let service: UserLanguageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserLanguageService],
    }).compile();

    service = module.get<UserLanguageService>(UserLanguageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
