import { Test, TestingModule } from '@nestjs/testing';
import { PayRateService } from './pay-rate.service';

describe('PayRateService', () => {
  let service: PayRateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayRateService],
    }).compile();

    service = module.get<PayRateService>(PayRateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
