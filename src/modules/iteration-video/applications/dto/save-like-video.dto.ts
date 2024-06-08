import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class SaveLikeVideoDto {
  @ApiProperty({ example: 1 })
  @IsString()
  videoId: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  like: boolean;
}

export class SaveLikeVideoWithUserDto extends SaveLikeVideoDto {
  userId: string;
}

export class SaveLikeVideoResponseDto {
  @ApiProperty({ example: true })
  success: boolean;
}
