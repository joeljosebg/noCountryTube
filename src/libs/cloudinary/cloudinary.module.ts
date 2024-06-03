import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
@Module({
  providers: [
    {
      provide: 'CLOUDINARY',
      useFactory: (configService: ConfigService) => {
        return cloudinary.config({
          cloud_name: configService.get('cloud_name'),
          api_key: configService.get('cloudinary_key'),
          api_secret: configService.get('cloudinary_secret'),
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['CLOUDINARY'],
})
export class CloudinaryModule {}
