import { BadRequestException } from "@nestjs/common";



export const fileFilter = ( req: Express.Request, file: Express.Multer.File, callback: Function ) => {


    if (file.fieldname === 'video') {
      if (!file.mimetype.match(/\/(mp4)$/)) {
        return callback(
          new BadRequestException(
            'Unsupported video format. Only mp4 is allowed.',
          ),
          false,
        );
      }
    } else if (file.fieldname === 'miniature') {
      if (!file.mimetype.match(/\/(jpeg|png)$/)) {  
        return callback(
          new BadRequestException(
            'Unsupported image format. Only jpeg and png are allowed.',
          ),
          false,
        );
      }
    } else {
      return callback(new BadRequestException('Unexpected field name'), false);
    }
    callback(null, true);

}