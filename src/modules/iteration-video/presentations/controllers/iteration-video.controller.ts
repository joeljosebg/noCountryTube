import {
  Controller,
  Post,
  Body,
  Inject,
  Injectable,
  Get,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  SaveLikeVideoWithUserDto,
  SaveLikeVideoResponseDto,
} from '../../applications/dto/save-like-video.dto';
import { IterationVideoServiceInterface } from '@/modules/iteration-video/domain/services/interation-video-service.interface';
import { ITERATION_VIDEO_SERVICE_TOKEN } from '../../provider.token';
import {
  SaveDisLikeVideoResponseDto,
  SaveDisLikeVideoWithUserDto,
} from '../../applications/dto/save-dislike-video.dto';
import { GetVideoIterationsResponseDto } from '../../applications/dto/get-video-iterations.dto';

@ApiTags('Iteration Videos')
@Controller('iteration-video')
@Injectable()
export class IterationVideoController {
  constructor(
    @Inject(ITERATION_VIDEO_SERVICE_TOKEN)
    private readonly iterationVideoService: IterationVideoServiceInterface,
  ) {}

  @Post('save-like')
  @ApiOkResponse({
    description: 'Retorna el video ha sido guardado correctamente.',
    type: SaveLikeVideoResponseDto,
  })
  saveLike(@Body() saveLike: SaveLikeVideoWithUserDto) {
    const userId = 1;
    return this.iterationVideoService.saveLike({ ...saveLike, userId });
  }
  @Post('save-dislike')
  @ApiOkResponse({
    description: 'Retorna el video ha sido guardado correctamente.',
    type: SaveDisLikeVideoResponseDto,
  })
  saveDisLike(@Body() saveDisLike: SaveDisLikeVideoWithUserDto) {
    const userId = 1;
    return this.iterationVideoService.saveDisLike({ ...saveDisLike, userId });
  }

  @Get('get-video-iterations')
  @ApiOkResponse({
    description: 'Retorna el video ha sido guardado correctamente.',
    type: GetVideoIterationsResponseDto,
  })
  getVideoIterations() {
    const userId = 1;
    return this.iterationVideoService.getVideoIterations(userId);
  }
}
