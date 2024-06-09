import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsEmail,
  IsString,
  Matches,
} from 'class-validator';

export class ValidateCodeDto {
  @ApiProperty({ example: 'email' })
  @IsString()
  userId: string;

  @ApiProperty({ example: 'code' })
  @IsString()
  code: string;
}
export class ValidateCodeResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Email enviado' })
  message: string;

  @ApiProperty({ example: 'userId' })
  userId?: string;

  @ApiProperty({ example: 'code' })
  code?: string;
}
