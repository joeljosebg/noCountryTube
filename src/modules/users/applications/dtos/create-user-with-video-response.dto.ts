import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../domain/entities/user.entity';

export class UserWithVideoResponseDto {
  @ApiProperty({ example: true, description: 'Success' })
  success: boolean;
  @ApiProperty({ example: 'User created successfully', description: 'Message' })
  message: string;
  @ApiProperty({ type: User, isArray: false, description: 'List of users' })
  data: User[];
}
