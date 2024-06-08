import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'userName' })
  @IsOptional()
  @IsString()
  userName?: string;

  @ApiPropertyOptional({ example: 'email' })
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'lastName' })
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiPropertyOptional({ example: 'firstName' })
  @IsOptional()
  @IsString()
  firstName: string;

  @ApiPropertyOptional({ example: 'password' })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional({ example: 'birthday' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  birthday?: Date;

  @ApiPropertyOptional({ example: 'phone' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: 'isActive' })
  @IsOptional()
  @IsString()
  isActive?: boolean;

  @ApiPropertyOptional({ example: 'photo' })
  @IsOptional()
  @IsString()
  photo?: string;
}
