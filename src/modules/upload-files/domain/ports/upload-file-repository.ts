

export abstract class UploadFileRepositoryPort {

    abstract uploadVideo( filePath: string, folder: string ): Promise<string>;
    abstract uploadImage( filePath: string, folder: string ): Promise<string>;

}