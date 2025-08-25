import { Test, TestingModule } from '@nestjs/testing';
import { CommentsGateway } from './comments.gateway';

describe('CommentsGateway', () => {
  let gateway: CommentsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentsGateway],
    }).compile();

    gateway = module.get<CommentsGateway>(CommentsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
