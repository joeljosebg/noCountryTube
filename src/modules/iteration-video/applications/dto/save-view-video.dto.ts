import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SaveViewVideoDto {
  @ApiProperty({ example: 'uui' })
  @IsString()
  videoId: string;
}

export class SaveViewVideoWithUserDto extends SaveViewVideoDto {
  userId: string;
}

export class SaveViewVideoResponseDto {
  @ApiProperty({ example: true })
  success: boolean;
}
