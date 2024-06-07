import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyEmailDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address to verify',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
