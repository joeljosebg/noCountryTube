import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class SaveDisLikeVideoDto {
  @ApiProperty({ example: 1 })
  @IsString()
  videoId: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  disLike: boolean;
}

export class SaveDisLikeVideoWithUserDto extends SaveDisLikeVideoDto {
  userId: string;
}

export class SaveDisLikeVideoResponseDto {
  @ApiProperty({ example: true })
  success: boolean;
}
