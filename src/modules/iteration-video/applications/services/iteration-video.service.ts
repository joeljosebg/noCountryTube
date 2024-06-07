import { Inject, Injectable } from '@nestjs/common';

import { IterationVideoServiceInterface } from '../../domain/services/interation-video-service.interface';
import {
  SaveLikeVideoWithUserDto,
  SaveLikeVideoResponseDto,
} from '../dto/save-like-video.dto';
import { IterationVideoRepositoryPort } from '../../domain/ports/interation-video';
import { ITERATION_VIDEO_REPOSITORY_TOKEN } from '../../provider.token';
import {
  SaveDisLikeVideoResponseDto,
  SaveDisLikeVideoWithUserDto,
} from '../dto/save-dislike-video.dto';
import { GetVideoIterationsResponseDto } from '../dto/get-video-iterations.dto';
import { IterationVideo } from '../../domain/entities/iteration-video.entity';

@Injectable()
export class IterationVideoService implements IterationVideoServiceInterface {
  constructor(
    @Inject(ITERATION_VIDEO_REPOSITORY_TOKEN)
    private iterationVideoRepository: IterationVideoRepositoryPort,
  ) {}
  async saveLike(
    saveLikeVideoDto: SaveLikeVideoWithUserDto,
  ): Promise<SaveLikeVideoResponseDto> {
    const iterationVideo = await this.iterationVideoRepository.saveLike(
      saveLikeVideoDto,
    );
    console.log({ iterationVideo });
    return {
      success: true,
    };
  }
  async saveDisLike(
    saveDisLikeVideoDto: SaveDisLikeVideoWithUserDto,
  ): Promise<SaveDisLikeVideoResponseDto> {
    const iterationVideo = await this.iterationVideoRepository.saveDisLike(
      saveDisLikeVideoDto,
    );
    console.log({ iterationVideo });
    return {
      success: true,
    };
  }
  async getVideoIterations(
    userId: string,
  ): Promise<GetVideoIterationsResponseDto> {
    const iterationsVideo: IterationVideo[] =
      await this.iterationVideoRepository.getVideoIterations(userId);
    return {
      success: true,
      dataList: iterationsVideo,
    };
  }
}
