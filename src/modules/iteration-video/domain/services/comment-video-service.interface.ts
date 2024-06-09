import {
  SaveCommentVideoResponseDto,
  SaveCommentVideoWithUserDto,
} from '@/modules/iteration-video/applications/dto/save-comment-video.dto';

export interface CommentVideoServiceInterface {
  saveCommentVideo(
    saveComment: SaveCommentVideoWithUserDto,
  ): Promise<SaveCommentVideoResponseDto>;
}
