import { CreateVideoDto } from "../../aplication/dtos/create-video.dto";
import { VideoResponse } from "../responses/video-response";
import { Video } from "../entities/video.entity";


export abstract class VideoService {

    abstract createVideo(createVideoDto: CreateVideoDto, videoPath:string, miniaturePath: string): Promise<VideoResponse<Video>>;

}