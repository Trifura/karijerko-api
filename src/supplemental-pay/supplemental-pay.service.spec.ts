import { Test, TestingModule } from '@nestjs/testing';
import { SupplementalPayService } from './supplemental-pay.service';

describe('SupplementalPayService', () => {
  let service: SupplementalPayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupplementalPayService],
    }).compile();

    service = module.get<SupplementalPayService>(SupplementalPayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
