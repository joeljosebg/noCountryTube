import { unlinkSync } from "fs";
import { v2 as cloudinary } from 'cloudinary';
import { UploadFileRepositoryPort } from "../../domain/ports/upload-file-repository";

export class UploadFileRepositoryImpl implements UploadFileRepositoryPort {


    async uploadVideo(filePath: string, folder: string): Promise<string> {
        try {
            const { secure_url } = await cloudinary.uploader.upload(filePath, { resource_type: 'video', folder: folder });
            unlinkSync(filePath);
            return secure_url;
        } catch (error) {
            console.log(error);
        }
    }

    async uploadImage(filePath: string, folder: string): Promise<string> {
        try {
            const { secure_url } = await cloudinary.uploader.upload(filePath, { resource_type: 'image', folder: folder });
            unlinkSync(filePath);
            return secure_url;
        } catch (error) {
            console.log(error);
        }
    }

}