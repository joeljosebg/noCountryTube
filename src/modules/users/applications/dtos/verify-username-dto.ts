import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyUsernameDto {
  @ApiProperty({
    example: 'username',
    description: 'The username to verify',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  username: string;
}
