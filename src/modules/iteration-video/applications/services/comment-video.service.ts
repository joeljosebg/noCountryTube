import { Inject, Injectable } from '@nestjs/common';
import { CommentVideoServiceInterface } from '@/modules/iteration-video/domain/services/comment-video-service.interface';
import { CommentVideoRepositoryPort } from '@/modules/iteration-video/domain/ports/comment-video.port';
import { COMMENT_VIDEO_REPOSITORY_TOKEN } from '@/modules/iteration-video/provider.token';
import {
  SaveCommentVideoResponseDto,
  SaveCommentVideoWithUserDto,
} from '@/modules/iteration-video/applications/dto/save-comment-video.dto';

@Injectable()
export class CommentVideoService implements CommentVideoServiceInterface {
  constructor(
    @Inject(COMMENT_VIDEO_REPOSITORY_TOKEN)
    private commentVideoRepository: CommentVideoRepositoryPort,
  ) {}
  async saveCommentVideo(
    saveComment: SaveCommentVideoWithUserDto,
  ): Promise<SaveCommentVideoResponseDto> {
    const CommentVideo = await this.commentVideoRepository.saveCommentVideo(
      saveComment,
    );
    console.log({ CommentVideo });
    return {
      success: true,
    };
  }
}
