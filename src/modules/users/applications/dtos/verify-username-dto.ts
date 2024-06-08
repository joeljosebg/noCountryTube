import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyUsernameDto {
  @ApiProperty({
    example: 'userName',
    description: 'The userName to verify',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  userName: string;
}
