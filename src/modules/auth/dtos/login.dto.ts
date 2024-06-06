import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'The email of the User',
  })
  @IsString()
  email: string;

  @ApiProperty({ example: 'password', description: 'The password of the User' })
  @IsString()
  password: string;
}
