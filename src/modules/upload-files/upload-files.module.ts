import { Module } from '@nestjs/common';
import { CloudinaryModule } from 'src/libs/cloudinary/cloudinary.module';
import { UploadfileServiceImpl } from './aplication/services/uploadfile/uploadfile.service';
import { UPLOAD_FILE_REPOSITORY, UPLOAD_FILE_SERVICE } from './provider.token';
import { UploadFileRepositoryImpl } from './infrastructure/repository/upload-repository';

@Module({
    imports: [
        CloudinaryModule
    ],
    providers: [
        {
            provide: UPLOAD_FILE_SERVICE,
            useClass: UploadfileServiceImpl,
        },
        {
            provide: UPLOAD_FILE_REPOSITORY,
            useClass: UploadFileRepositoryImpl
        }
    ],
    exports: [
        UPLOAD_FILE_SERVICE,
        UPLOAD_FILE_REPOSITORY
    ]
})
export class UploadFilesModule {}
