import { Module } from '@nestjs/common';
import { IterationVideoService } from './applications/services/iteration-video.service';
import { IterationVideoController } from './presentations/controllers/iteration-video.controller';
import { DatabaseModule } from '@/libs/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IterationVideo } from '@/modules/iteration-video/domain/entities/iteration-video.entity';

import {
  ITERATION_VIDEO_REPOSITORY_TOKEN,
  ITERATION_VIDEO_SERVICE_TOKEN,
} from './provider.token';
import { IterationVideoRepository } from '@/modules/iteration-video/infrastructure/repositories/iteration-video.repository';
import { Video } from '@/modules/iteration-video/domain/entities/video.entity';
import { User } from '@/modules/users_test/domain/entities/user.entity';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([IterationVideo, Video, User]),
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
  ],
})
export class IterationVideoModule {}
