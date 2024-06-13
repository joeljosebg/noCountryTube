import { CommentVideo } from "@/modules/iteration-video/domain/entities/comment-video.entity";

export class VideoDetailsResponse {

    private constructor (
        public id: string,
        public title: string,
        public video: string,
        public miniature: string,
        public duration: string,
        public nameUser: string,
        public description?: string,
        public comments?: CommentVideo[]
    ){}


    public static fromObject( object: {[key: string]: any} ): VideoDetailsResponse {
        
        const { id, title, videoUrl, miniatureUrl, description,duration, nameUser, comments } = object;

        

        if( !id || !title || !videoUrl || !nameUser || !miniatureUrl || !duration ) {
            throw new Error('error creating instance VideoDatailsResponse');
        }

        return new VideoDetailsResponse(
            id,
            title,
            videoUrl,
            miniatureUrl,
            duration,
            nameUser,
            description,
            comments
        )
    }
    
}






