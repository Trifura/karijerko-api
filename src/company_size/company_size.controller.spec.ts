import { Test, TestingModule } from '@nestjs/testing';
import { CompanySizeController } from './company_size.controller';
import { CompanySizeService } from './company_size.service';

describe('CompanySizeController', () => {
  let controller: CompanySizeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanySizeController],
      providers: [CompanySizeService],
    }).compile();

    controller = module.get<CompanySizeController>(CompanySizeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
