import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateVideoDto } from '../aplication/dtos/create-video.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter } from './helpers/fileFilter';
import { VIDEO_SERVICE_TOKEN } from '../provider.token';
import { VideoService } from '../domain/services/video-service';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('videos')
@Controller('videos')
export class VideosController {
  constructor(
    @Inject(VIDEO_SERVICE_TOKEN)
    private readonly videoService: VideoService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
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
          destination: './uploads/temp',
        }),
        preservePath: true,
      },
    ),
  )
  createVideo(
    @Body() createVideoDto: CreateVideoDto,
    @Req() req,
    @UploadedFiles()
    files: { video: Express.Multer.File; miniature: Express.Multer.File },
  ) {
    if (!files.video) throw new BadRequestException('Video is required.');
    return this.videoService.createVideo(
      { ...createVideoDto, userId: req.user.userId },
      files.video[0].path,
      files.miniature[0].path,
    );
  }

  @Get()
  findAll(): string {
    return 'This action returns all videos';
  }
}
