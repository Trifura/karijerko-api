import { Test, TestingModule } from '@nestjs/testing';
import { SupplementalPayController } from './supplemental-pay.controller';
import { SupplementalPayService } from './supplemental-pay.service';

describe('SupplementalPayController', () => {
  let controller: SupplementalPayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplementalPayController],
      providers: [SupplementalPayService],
    }).compile();

    controller = module.get<SupplementalPayController>(
      SupplementalPayController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
