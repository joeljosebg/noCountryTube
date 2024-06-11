import { CommentVideo } from '@/modules/iteration-video/domain/entities/comment-video.entity';
import { SaveCommentVideoWithUserDto } from '@/modules/iteration-video/applications/dto/save-comment-video.dto';

export interface CommentVideoRepositoryPort {
  saveCommentVideo(
    saveComment: SaveCommentVideoWithUserDto,
  ): Promise<CommentVideo>;
}
