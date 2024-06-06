import { ApiProperty } from '@nestjs/swagger';
export class SuccessResponseDto {
  @ApiProperty({ example: true, description: 'Success' })
  success: boolean;
  @ApiProperty({ example: 'User created successfully', description: 'Message' })
  message?: string;
}
