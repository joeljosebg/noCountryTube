import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsEmail,
  IsString,
  Matches,
} from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({ example: 'email' })
  @IsString()
  @IsEmail()
  email: string;
}
export class ResetPasswordResponseDto {
  @ApiProperty({ example: true })
  success: boolean;
  @ApiProperty({ example: 'Email enviado' })
  message: string;
  @ApiProperty({ example: 'userId' })
  userId?: string;
}
