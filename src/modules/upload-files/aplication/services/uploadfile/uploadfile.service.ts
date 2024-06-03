import { Inject, Injectable } from '@nestjs/common';
import { UploadFileRepositoryPort } from 'src/modules/upload-files/domain/ports/upload-file-repository';
import { UploadFileServiceInterface } from 'src/modules/upload-files/domain/services/upload-file-service';
import { UPLOAD_FILE_REPOSITORY } from 'src/modules/upload-files/provider.token';

@Injectable()
export class UploadfileServiceImpl implements UploadFileServiceInterface {

    constructor(
        @Inject( UPLOAD_FILE_REPOSITORY )
        private uploadFileRepository: UploadFileRepositoryPort
    ){}

    uploadVideo(filePath: string, folder: string): Promise<string> {
        return this.uploadFileRepository.uploadVideo(filePath, folder);
    }

    uploadImage(filePath: string, folder: string): Promise<string> {
        return this.uploadFileRepository.uploadImage(filePath, folder);
    }

}
