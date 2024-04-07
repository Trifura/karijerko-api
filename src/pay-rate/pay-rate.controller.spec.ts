import { Test, TestingModule } from '@nestjs/testing';
import { PayRateController } from './pay-rate.controller';
import { PayRateService } from './pay-rate.service';

describe('PayRateController', () => {
  let controller: PayRateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayRateController],
      providers: [PayRateService],
    }).compile();

    controller = module.get<PayRateController>(PayRateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
