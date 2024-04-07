import { Test, TestingModule } from '@nestjs/testing';
import { LocationTypeController } from './location-type.controller';
import { LocationTypeService } from './location-type.service';

describe('LocationTypeController', () => {
  let controller: LocationTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationTypeController],
      providers: [LocationTypeService],
    }).compile();

    controller = module.get<LocationTypeController>(LocationTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
