
export class VideoResponse<T> {

    

    constructor(

        public ok: boolean,
        public message: string,
        public data: T

    ){}


}