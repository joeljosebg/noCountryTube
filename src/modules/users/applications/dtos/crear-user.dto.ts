import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsDateString, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'username' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'email' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'lastName' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'firstName' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'birthday' })
  @IsDate()
  @Type(() => Date)
  birthday: Date;

  @ApiProperty({ example: 'phone' })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'isActive' })
  @IsString()
  isActive: boolean;

  @ApiProperty({ example: 'photo' })
  @IsString()
  photo: string;

  role: string;
  createdAt: Date;
  updatedAt: Date;
}
