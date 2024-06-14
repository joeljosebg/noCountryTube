import {
  Controller,
  Post,
  Body,
  Inject,
  Injectable,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  SaveLikeVideoWithUserDto,
  SaveLikeVideoResponseDto,
} from '@/modules/iteration-video/applications/dto/save-like-video.dto';
import { IterationVideoServiceInterface } from '@/modules/iteration-video/domain/services/interation-video-service.interface';
import {
  COMMENT_VIDEO_SERVICE_TOKEN,
  ITERATION_VIDEO_SERVICE_TOKEN,
  VIEW_VIDEO_SERVICE_TOKEN,
} from '@/modules/iteration-video/provider.token';
import {
  SaveDisLikeVideoResponseDto,
  SaveDisLikeVideoWithUserDto,
} from '@/modules/iteration-video/applications/dto/save-dislike-video.dto';
import { GetVideoIterationsResponseDto } from '@/modules/iteration-video/applications/dto/get-video-iterations.dto';
import { AuthGuard } from '@nestjs/passport';
import { CommentVideoServiceInterface } from '@/modules/iteration-video/domain/services/comment-video-service.interface';
import { SaveCommentVideoDto } from '@/modules/iteration-video/applications/dto/save-comment-video.dto';
import { SaveViewVideoDto } from '@/modules/iteration-video/applications/dto/save-view-video.dto';
import { ViewVideoServiceInterface } from '@/modules/iteration-video/domain/services/view-video-service.interface';
import { WebsocketGateway } from '@/libs/websocket/websocket.gateway';
import { VIDEO_SERVICE_TOKEN } from '@/modules/videos/provider.token';
import { VideoService } from '@/modules/videos/domain/services/video-service';

@ApiTags('Iteration Videos')
@Controller('iteration-video')
@Injectable()
export class IterationVideoController {
  constructor(
    @Inject(ITERATION_VIDEO_SERVICE_TOKEN)
    private readonly iterationVideoService: IterationVideoServiceInterface,
    @Inject(COMMENT_VIDEO_SERVICE_TOKEN)
    private readonly commentVideoService: CommentVideoServiceInterface,
    @Inject(VIEW_VIDEO_SERVICE_TOKEN)
    private readonly viewVideoService: ViewVideoServiceInterface,
    private readonly websocketGateway: WebsocketGateway,
    @Inject(VIDEO_SERVICE_TOKEN)
    private readonly videoService: VideoService,
  ) {}

  @Post('save-like')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Guarda un Like' })
  @ApiOkResponse({
    description: 'Retorna el video ha sido guardado correctamente.',
    type: SaveLikeVideoResponseDto,
  })
  async saveLike(@Req() req, @Body() saveLike: SaveLikeVideoWithUserDto) {
    const userId = req.user.userId;
    const save = await this.iterationVideoService.saveLike({
      ...saveLike,
      userId,
    });
    const video = await this.videoService.getVideoDetailById(
      saveLike.videoId,
      req.user?.userId,
    );

    this.websocketGateway.server.emit(saveLike.videoId, video);
    return save;
  }

  @Post('save-dislike')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Guarda el dislike' })
  @ApiOkResponse({
    description: 'Retorna el video ha sido guardado correctamente.',
    type: SaveDisLikeVideoResponseDto,
  })
  async saveDisLike(
    @Req() req,
    @Body() saveDisLike: SaveDisLikeVideoWithUserDto,
  ) {
    const userId = req.user.userId;
    const save = await this.iterationVideoService.saveDisLike({
      ...saveDisLike,
      userId,
    });
    const video = await this.videoService.getVideoDetailById(
      saveDisLike.videoId,
      req.user?.userId,
    );

    this.websocketGateway.server.emit(saveDisLike.videoId, video);
    return save;
  }

  @Get('get-video-iterations')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Retorna la cantidad de iteraciones de un video' })
  @ApiOkResponse({
    description: 'Retorna el video ha sido guardado correctamente.',
    type: GetVideoIterationsResponseDto,
  })
  getVideoIterations(@Req() req) {
    const userId = req.user.userId;
    return this.iterationVideoService.getVideoIterations(userId);
  }

  @Post('save-comment')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Guarda un comentario' })
  @ApiOkResponse({
    description: 'Retorna el comentario ha sido guardado correctamente.',
    type: SaveDisLikeVideoResponseDto,
  })
  async savecommentVideo(@Req() req, @Body() saveComment: SaveCommentVideoDto) {
    const userId = req.user.userId;
    const save = await this.commentVideoService.saveCommentVideo({
      ...saveComment,
      userId,
    });
    const video = await this.videoService.getVideoDetailById(
      saveComment.videoId,
      req.user?.userId,
    );

    this.websocketGateway.server.emit(saveComment.videoId, video);
    return save;
  }
  @Post('save-view')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Guarda cuando el usuario vea el video' })
  @ApiOkResponse({
    description: 'Retorna el comentario ha sido guardado correctamente.',
    type: SaveDisLikeVideoResponseDto,
  })
  async saveView(@Req() req, @Body() saveView: SaveViewVideoDto) {
    const userId = req.user.userId;
    const save = await this.viewVideoService.saveViewVideo({
      ...saveView,
      userId,
    });
    const video = await this.videoService.getVideoDetailById(
      saveView.videoId,
      req.user?.userId,
    );

    this.websocketGateway.server.emit(saveView.videoId, video);
    return save;
  }
}
