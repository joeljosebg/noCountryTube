import { CreateVideoDto } from '../../aplication/dtos/create-video.dto';
import { VideoResponse } from '../responses/video-response';
import { Video } from '../entities/video.entity';
import { VideoDetailsResponse } from '../responses/video-details-response';
import { PaginationDto } from '@/modules/common/dtos/pagination.dto';
import { UpdateVideoDto } from '../../aplication/dtos/update-video.dto';

export abstract class VideoService {
  abstract createVideo(
    createVideoDto: CreateVideoDto,
    videoPath: string,
    miniaturePath: string,
  ): Promise<VideoResponse<Video>>;
  abstract getAllVideos(
    paginationDto: PaginationDto,
  ): Promise<VideoResponse<VideoDetailsResponse[]>>;
  abstract getVideoDetailById(
    id: string,
    userId?: string,
  ): Promise<VideoResponse<VideoDetailsResponse>>;
  abstract getVideoById(id: string): Promise<Video>;
  abstract searchVideos(
    term: string,
  ): Promise<VideoResponse<VideoDetailsResponse[]>>;
  abstract updateVideo(
    id: string,
    updateVideoDto: UpdateVideoDto,
  ): Promise<boolean>;
  abstract deleteVideo(id: string): Promise<boolean>;
}
