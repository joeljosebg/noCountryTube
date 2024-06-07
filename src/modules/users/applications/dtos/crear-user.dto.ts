import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsEmail,
  IsString,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'username' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'email' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password' })
  @Transform(({ value }) => value.toLowerCase())
  @Matches(/^[a-z0-9._]+$/, {
    message:
      'Username must contain only lowercase letters, numbers, dots, and underscores.',
  })
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
