import { Module } from '@nestjs/common';
import { IterationVideoService } from './applications/services/iteration-video.service';
import { IterationVideoController } from './presentations/controllers/iteration-video.controller';
import { DatabaseModule } from '@/libs/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IterationVideo } from '@/modules/iteration-video/domain/entities/iteration-video.entity';

import {
  COMMENT_VIDEO_REPOSITORY_TOKEN,
  COMMENT_VIDEO_SERVICE_TOKEN,
  ITERATION_VIDEO_REPOSITORY_TOKEN,
  ITERATION_VIDEO_SERVICE_TOKEN,
  VIEW_VIDEO_REPOSITORY_TOKEN,
  VIEW_VIDEO_SERVICE_TOKEN,
} from './provider.token';
import { IterationVideoRepository } from '@/modules/iteration-video/infrastructure/repositories/iteration-video.repository';
import { Video } from '@/modules/videos/domain/entities/video.entity';
import { User } from '@/modules/users/domain/entities/user.entity';
import { CommentVideo } from '@/modules/iteration-video/domain/entities/comment-video.entity';
import { CommentVideoRepository } from '@/modules/iteration-video/infrastructure/repositories/comment-video.repository';
import { CommentVideoService } from '@/modules/iteration-video/applications/services/comment-video.service';
import { ViewVideo } from './domain/entities/view-video.entity';
import { ViewVideoRepository } from './infrastructure/repositories/view-video.repository';
import { ViewVideoService } from './applications/services/view-video.service';
import { WebsocketModule } from '@/libs/websocket/websocket.module';
import { VideosModule } from '@/modules/videos/videos.module';

@Module({
  imports: [
    WebsocketModule,
    DatabaseModule,
    TypeOrmModule.forFeature([
      IterationVideo,
      Video,
      User,
      CommentVideo,
      ViewVideo,
    ]),
    VideosModule,
  ],
  controllers: [IterationVideoController],
  providers: [
    {
      provide: ITERATION_VIDEO_REPOSITORY_TOKEN,
      useClass: IterationVideoRepository,
    },
    {
      provide: ITERATION_VIDEO_SERVICE_TOKEN,
      useClass: IterationVideoService,
    },
    {
      provide: COMMENT_VIDEO_REPOSITORY_TOKEN,
      useClass: CommentVideoRepository,
    },
    {
      provide: COMMENT_VIDEO_SERVICE_TOKEN,
      useClass: CommentVideoService,
    },
    {
      provide: VIEW_VIDEO_REPOSITORY_TOKEN,
      useClass: ViewVideoRepository,
    },
    {
      provide: VIEW_VIDEO_SERVICE_TOKEN,
      useClass: ViewVideoService,
    },
  ],
})
export class IterationVideoModule {}
