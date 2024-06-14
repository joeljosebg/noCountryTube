import { Inject, Injectable } from '@nestjs/common';
import { ViewVideoServiceInterface } from '@/modules/iteration-video/domain/services/view-video-service.interface';
import { ViewVideoRepositoryPort } from '@/modules/iteration-video/domain/ports/view-video.port';
import { VIEW_VIDEO_REPOSITORY_TOKEN } from '@/modules/iteration-video/provider.token';
import {
  SaveViewVideoResponseDto,
  SaveViewVideoWithUserDto,
} from '@/modules/iteration-video/applications/dto/save-view-video.dto';

@Injectable()
export class ViewVideoService implements ViewVideoServiceInterface {
  constructor(
    @Inject(VIEW_VIDEO_REPOSITORY_TOKEN)
    private viewVideoRepository: ViewVideoRepositoryPort,
  ) {}
  async saveViewVideo(
    saveView: SaveViewVideoWithUserDto,
  ): Promise<SaveViewVideoResponseDto> {
    const viewVideo = await this.viewVideoRepository.saveViewVideo(saveView);
    console.log({ viewVideo });
    return {
      success: true,
    };
  }
}
