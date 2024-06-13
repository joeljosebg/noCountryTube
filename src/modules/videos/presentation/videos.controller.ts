
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';



import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { VIDEO_SERVICE_TOKEN } from '../provider.token';
import { VideoService } from '../domain/services/video-service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter';
import { diskStorage } from 'multer';
import { CreateVideoDto } from '../aplication/dtos/create-video.dto';
import { PaginationDto } from '@/modules/common/dtos/pagination.dto';
import { VideoResponse } from '../domain/responses/video-response';
import { VideoDetailsResponse } from '../domain/responses/video-details-response';
import { UpdateVideoDto } from '../aplication/dtos/update-video.dto';
import { boolean } from 'joi';


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

  
  
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  createVideo(
    @Body() createVideoDto: CreateVideoDto,
    @Req() req,
    @UploadedFiles()
    files: { video: Express.Multer.File; miniature: Express.Multer.File },
  ) {
    if (!files.video) throw new BadRequestException('Video is required.');
    if( !files.miniature) throw new BadRequestException('Miniature is required.');
    return this.videoService.createVideo(
      { ...createVideoDto, userId: req.user.userId },
      files.video[0].path,
      files.miniature[0].path,
    );

  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all videos with pagination' })
  @ApiResponse({
    status: 200,
    description: 'Successful retrieval of videos.',
    type: VideoResponse,
  })
  @ApiQuery({ name: 'offset', required: false, description: 'The number of items to skip before starting to collect the result set.' })
  @ApiQuery({ name: 'limit', required: false, description: 'The number of items to return.' })
  findAll( @Query() paginationDto: PaginationDto): Promise<VideoResponse<VideoDetailsResponse[]>> {
    return this.videoService.getAllVideos(paginationDto);
  }


  @Get(':id')
  @ApiOperation({ summary: 'Get video by id' })
  @ApiResponse({
    status: 200,
    description: 'Get video by id',
    type: VideoResponse,
  })

  findVideoById( @Param('id', ParseUUIDPipe) id: string ): Promise<VideoResponse<VideoDetailsResponse>> {
    return this.videoService.getVideoDetailById(id);
  }


  @Get('/search/:term')
  @ApiOperation({ summary: 'Search videos' })
  @ApiResponse({
    status: 200,
    description: 'Search videos',
    type: VideoResponse,
  })

  searchVideos( @Param('term') term: string ): Promise<VideoResponse<VideoDetailsResponse[]>> {
    return this.videoService.searchVideos(term);
  }


  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update a video' })
  @ApiResponse({
    status: 201,
    description: 'Update a video',
    type: boolean,
  })
  updateVideo( @Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto): Promise<boolean>{
    return this.videoService.updateVideo(id, updateVideoDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete a video' })
  @ApiResponse({
    status: 201,
    description: 'Delete a video',
    type: boolean,
  })

  deleteVideo( @Param('id') id: string): Promise<boolean> {
    return this.videoService.deleteVideo(id);
  }

}
