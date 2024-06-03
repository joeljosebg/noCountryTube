import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from './config';
import { VideosModule } from './modules/videos/videos.module';
import { DatabaseModule } from './libs/database/database.module';
import { SupabaseModule } from './libs/supabase/supabase.module';
import { CloudinaryModule } from './libs/cloudinary/cloudinary.module';
import { UploadFilesModule } from './modules/upload-files/upload-files.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.host,
      port: envs.port,
      database: envs.database,
      username: envs.user,
      password: envs.password,
      autoLoadEntities: true,
      synchronize: true
    }),
    VideosModule,
    DatabaseModule,
    SupabaseModule,
    CloudinaryModule,
    UploadFilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
