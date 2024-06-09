import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CommentVideo } from '@/modules/iteration-video/domain/entities/comment-video.entity';
import { SaveCommentVideoWithUserDto } from '@/modules/iteration-video/applications/dto/save-comment-video.dto';
import { CommentVideoRepositoryPort } from '@/modules/iteration-video/domain/ports/comment-video.port';

@Injectable()
export class CommentVideoRepository implements CommentVideoRepositoryPort {
  constructor(
    @InjectRepository(CommentVideo)
    private commentVideoRepository: Repository<CommentVideo>,
  ) {}

  async saveCommentVideo(
    saveComment: SaveCommentVideoWithUserDto,
  ): Promise<CommentVideo> {
    console.log({
      saveComment,
    });

    return this.commentVideoRepository.save({
      ...saveComment,
    });
  }
}
