import { BadRequestException, Body, Controller, Get, Inject, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { CreateVideoDto } from '../aplication/dtos/create-video.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter } from './helpers/fileFilter';
import { VIDEO_SERVICE_TOKEN } from '../provider.token';
import { VideoService } from '../domain/services/video-service';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('videos')
@Controller('videos')
export class VideosController {
  constructor(
    @Inject(VIDEO_SERVICE_TOKEN)
    private readonly videoService: VideoService,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiOperation({ summary: 'Create a video' })
  @ApiConsumes('multipart/form-data')

  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'video', maxCount: 1 },
        { name: 'miniature', maxCount: 1 },
      ],
      {
        fileFilter: fileFilter,
        storage: diskStorage({
            destination: './uploads/temp'
        }),
        preservePath: true
      },
    ),
  )
  
  createVideo(
    @Body() createVideoDto: CreateVideoDto,
    @UploadedFiles()
    files: { video: Express.Multer.File; miniature: Express.Multer.File },
  ) {
    if (!files.video) throw new BadRequestException('Video is required.');
    return this.videoService.createVideo(createVideoDto, files.video[0].path, files.miniature[0].path);
  }

  @Get()
  findAll(): string {
    return 'This action returns all videos';
  }
}
