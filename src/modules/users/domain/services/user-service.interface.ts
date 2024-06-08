import { CreateUserDto } from '@/modules/users/applications/dtos/crear-user.dto';
import { UserResponseDto } from '@/modules/users/applications/dtos/create-user-response.dto';
import { GetUsersResponseDto } from '@/modules/users/applications/dtos/get-users-response.dto';
import { SuccessResponseDto } from '@/modules/users/applications/dtos/success-response.dto';
import { UpdateUserDto } from '../../applications/dtos/update-user.dto';
import { User } from '../entities/user.entity';

export interface UserServiceInterface {
  createUser(user: CreateUserDto): Promise<UserResponseDto>;
  getUsers(): Promise<GetUsersResponseDto>;
  updateUser(id: string, user: UpdateUserDto): Promise<UserResponseDto>;
  deleteUser(id: string): Promise<SuccessResponseDto>;
  getUser(id: string): Promise<UserResponseDto>;
  findByEmail(email: string): Promise<User>;
  findByUsername(userName: string): Promise<User>;
  verifyEmail(email: string): Promise<boolean>;
  verifyUsername(userName: string): Promise<boolean>;
}
