import { CreateVideoDto } from "../../aplication/dtos/create-video.dto";
import { VideoResponse } from "../responses/video-response";
import { Video } from "../entities/video.entity";
import { VideoDetailsResponse } from "../responses/video-details-response";
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { HttpException, NotFoundException } from "@nestjs/common";


export abstract class VideoRepositoryPort {

    abstract createVideo(createVideoDto: CreateVideoDto, videoPath: string, miniaturePath: string): Promise<VideoResponse<Video>>;
    abstract getAllVideos(paginationDto: PaginationDto): Promise<VideoResponse<VideoDetailsResponse[]>>;
    abstract getVideoDetailById(id: string): Promise<VideoResponse<VideoDetailsResponse>>;
    abstract searchVideos(term: string): Promise<VideoResponse<VideoDetailsResponse[]>>;

}