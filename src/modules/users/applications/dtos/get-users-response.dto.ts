import { ApiProperty } from '@nestjs/swagger';
import { User } from '@/modules/users/domain/entities/user.entity';

export class GetUsersResponseDto {
  @ApiProperty({ example: true, description: 'Success' })
  success: boolean;
  @ApiProperty({ example: 'List of users', description: 'Message' })
  message: string;
  @ApiProperty({ type: [User], isArray: false, description: 'List of users' })
  data: User[];
}
