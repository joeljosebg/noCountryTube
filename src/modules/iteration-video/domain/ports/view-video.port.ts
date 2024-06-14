import { ViewVideo } from '@/modules/iteration-video/domain/entities/view-video.entity';
import { SaveViewVideoWithUserDto } from '@/modules/iteration-video/applications/dto/save-view-video.dto';

export interface ViewVideoRepositoryPort {
  saveViewVideo(saveView: SaveViewVideoWithUserDto): Promise<ViewVideo>;
}
