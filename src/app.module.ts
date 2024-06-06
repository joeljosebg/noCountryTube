import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfig } from '@/config/envs.config';
import { configSchema } from '@/config/config.schema';
import { DatabaseModule } from '@/libs/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { IterationVideoModule } from './modules/iteration-video/iteration-video.module';

import { VideosModule } from './modules/videos/videos.module';
import { SupabaseModule } from './libs/supabase/supabase.module';
import { CloudinaryModule } from './libs/cloudinary/cloudinary.module';
import { UploadFilesModule } from './modules/upload-files/upload-files.module';
import { BcryptModule } from './libs/bcrypt/bcrypt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [EnvConfig],
      validationSchema: configSchema,
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    IterationVideoModule,
    VideosModule,
    SupabaseModule,
    CloudinaryModule,
    UploadFilesModule,
    BcryptModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
