import { Video } from '@/modules/videos/domain/entities/video.entity';

export interface VideoDetail extends Video {
  likeCount: number;
  disLikeCount: number;
}
