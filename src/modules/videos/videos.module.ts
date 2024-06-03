import { Module } from '@nestjs/common';
import { VideosController } from './presentation/videos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './domain/entities/video.entity';
import { VideoServiceImpl } from './aplication/services/video/video.service';
import { VideoRepositoryImpl } from './infrastructure/repository/video-repository/video-repository';
import { UPLOAD_FILE_ADAPTER, VIDEO_REPOSITORY_TOKEN, VIDEO_SERVICE_TOKEN } from './provider.token';
import { SupabaseModule } from 'src/libs/supabase/supabase.module';
import { CloudinaryModule } from 'src/libs/cloudinary/cloudinary.module';
import { MulterModule } from '@nestjs/platform-express';
import { UploadFilesModule } from '../upload-files/upload-files.module';


@Module({
  controllers: [VideosController],
  imports: [
    TypeOrmModule.forFeature([Video]),
    MulterModule.register({
      dest: './uploads/temp'
    }),
    SupabaseModule,
    CloudinaryModule,
    UploadFilesModule
  ],
  providers: [
    {
      provide: VIDEO_SERVICE_TOKEN,
      useClass: VideoServiceImpl
    },
    {
      provide: VIDEO_REPOSITORY_TOKEN,
      useClass: VideoRepositoryImpl
    },
    
  ]
})
export class VideosModule {}
