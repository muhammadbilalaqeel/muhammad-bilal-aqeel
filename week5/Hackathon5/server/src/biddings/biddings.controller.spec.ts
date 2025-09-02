import { Test, TestingModule } from '@nestjs/testing';
import { BiddingsController } from './biddings.controller';

describe('BiddingsController', () => {
  let controller: BiddingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BiddingsController],
    }).compile();

    controller = module.get<BiddingsController>(BiddingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
