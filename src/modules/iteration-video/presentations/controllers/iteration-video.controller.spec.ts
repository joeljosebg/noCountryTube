import { Test, TestingModule } from '@nestjs/testing';
import { IterationVideoController } from './iteration-video.controller';
import { IterationVideoService } from '../../applications/services/iteration-video.service';

describe('IterationVideoController', () => {
  let controller: IterationVideoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IterationVideoController],
      providers: [IterationVideoService],
    }).compile();

    controller = module.get<IterationVideoController>(IterationVideoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
