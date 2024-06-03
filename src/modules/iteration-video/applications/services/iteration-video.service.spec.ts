import { Test, TestingModule } from '@nestjs/testing';
import { IterationVideoService } from './iteration-video.service';

describe('IterationVideoService', () => {
  let service: IterationVideoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IterationVideoService],
    }).compile();

    service = module.get<IterationVideoService>(IterationVideoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
