import { SaveLikeVideoWithUserDto } from '@/modules/iteration-video/applications/dto/save-like-video.dto';
import { IterationVideo } from '@/modules/iteration-video/domain/entities/iteration-video.entity';
import { SaveDisLikeVideoWithUserDto } from '../../applications/dto/save-dislike-video.dto';

export interface IterationVideoRepositoryPort {
  saveLike(saveLike: SaveLikeVideoWithUserDto): Promise<IterationVideo>;
  saveDisLike(
    saveDisLike: SaveDisLikeVideoWithUserDto,
  ): Promise<IterationVideo>;
  getVideoIterations(userId: number): Promise<IterationVideo[]>;
}
