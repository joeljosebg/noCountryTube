import { Inject, Injectable } from '@nestjs/common';
import { Video } from 'src/modules/videos/domain/entities/video.entity';
import { VideoRepositoryPort } from 'src/modules/videos/domain/ports/video-repository';
import { VideoResponse } from 'src/modules/videos/domain/responses/video-response';
import { VideoService } from 'src/modules/videos/domain/services/video-service';
import { VIDEO_REPOSITORY_TOKEN } from 'src/modules/videos/provider.token';
import { CreateVideoDto } from '../../dtos/create-video.dto';
import { VideoDatailsResponse } from '@/modules/videos/domain/responses/video-details-response';
import { PaginationDto } from '@/modules/common/dtos/pagination.dto';

@Injectable()
export class VideoServiceImpl implements VideoService {

    constructor(
        @Inject(VIDEO_REPOSITORY_TOKEN)
        private videoRepository: VideoRepositoryPort
    ){}
    

    createVideo(createVideoDto: CreateVideoDto, videoPath:string, miniaturePath: string): Promise<VideoResponse<Video>> {
        return this.videoRepository.createVideo(createVideoDto, videoPath, miniaturePath);
    }

    getAllVideos(paginationDto: PaginationDto): Promise<VideoResponse<VideoDatailsResponse[]>> {
        return this.videoRepository.getAllVideos(paginationDto);
    }
}
