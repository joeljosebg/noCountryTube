import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SaveCommentVideoDto {
  @ApiProperty({ example: 'uui' })
  @IsString()
  videoId: string;

  @ApiProperty({ example: 'Comentario' })
  @IsString()
  commentText: string;
}

export class SaveCommentVideoWithUserDto extends SaveCommentVideoDto {
  userId: string;
}

export class SaveCommentVideoResponseDto {
  @ApiProperty({ example: true })
  success: boolean;
}
