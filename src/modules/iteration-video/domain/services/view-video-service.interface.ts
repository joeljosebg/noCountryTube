import {
  SaveViewVideoResponseDto,
  SaveViewVideoWithUserDto,
} from '@/modules/iteration-video/applications/dto/save-view-video.dto';

export interface ViewVideoServiceInterface {
  saveViewVideo(
    saveView: SaveViewVideoWithUserDto,
  ): Promise<SaveViewVideoResponseDto>;
}
