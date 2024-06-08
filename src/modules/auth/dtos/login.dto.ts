import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Matches } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'username',
    description: 'The username of the User',
  })
  @Transform(({ value }) => value.toLowerCase())
  @Matches(/^[a-z0-9._]+$/, {
    message:
      'Username must contain only lowercase letters, numbers, dots, and underscores.',
  })
  username: string;

  @ApiProperty({ example: 'password', description: 'The password of the User' })
  @IsString()
  password: string;
}
