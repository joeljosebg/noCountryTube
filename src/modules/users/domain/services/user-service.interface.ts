import { CreateUserDto } from '@/modules/users/applications/dtos/crear-user.dto';
import { User } from '@/modules/users/domain/entities/user.entity';
import { ResponseCreateUserDto } from '../../applications/dtos/response-create-user.dto';

export interface UserServiceInterface {
  createUser(user: CreateUserDto): Promise<ResponseCreateUserDto>;
  updateUser(user: User): Promise<User>;
  deleteUser(id: number): Promise<void>;
  getUser(id: number): Promise<User>;
  getUsers(): Promise<User[]>;
}
