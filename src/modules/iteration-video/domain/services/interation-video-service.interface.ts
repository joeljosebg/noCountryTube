import {
  SaveLikeVideoWithUserDto,
  SaveLikeVideoResponseDto,
} from '@/modules/iteration-video/applications/dto/save-like-video.dto';
import {
  SaveDisLikeVideoResponseDto,
  SaveDisLikeVideoWithUserDto,
} from '@/modules/iteration-video/applications/dto/save-dislike-video.dto';
import { GetVideoIterationsResponseDto } from '@/modules/iteration-video/applications/dto/get-video-iterations.dto';

export interface IterationVideoServiceInterface {
  saveLike(
    saveLike: SaveLikeVideoWithUserDto,
  ): Promise<SaveLikeVideoResponseDto>;
  saveDisLike(
    saveDisLike: SaveDisLikeVideoWithUserDto,
  ): Promise<SaveDisLikeVideoResponseDto>;
  getVideoIterations(userId: string): Promise<GetVideoIterationsResponseDto>;
}
