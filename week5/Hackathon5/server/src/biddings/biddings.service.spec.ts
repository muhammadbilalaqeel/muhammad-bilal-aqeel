import { Test, TestingModule } from '@nestjs/testing';
import { BiddingsService } from './biddings.service';

describe('BiddingsService', () => {
  let service: BiddingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BiddingsService],
    }).compile();

    service = module.get<BiddingsService>(BiddingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
