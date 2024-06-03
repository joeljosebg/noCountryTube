import { Module } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { envs } from 'src/config';

@Module({
    providers: [
        {
            provide: 'CLOUDINARY',
            useFactory: () => {
                return cloudinary.config({
                    cloud_name: envs.cloud_name,
                    api_key: envs.cloudinary_key,
                    api_secret: envs.cloudinary_secret
                })
            }
        }
    ],
    exports: ['CLOUDINARY']
})
export class CloudinaryModule {}
