import { CreateUserDto } from '@/modules/users/applications/dtos/crear-user.dto';
import { User } from '@/modules/users/domain/entities/user.entity';
import { UpdateUserDto } from '../../applications/dtos/update-user.dto';

export interface UserRepositoryPort {
  createUser(user: CreateUserDto): Promise<User>;
  updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User>;
  deleteUser(id: string): Promise<void>;
  getUser(id: string): Promise<User>;
  getUsers(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  findByUsername(userName: string): Promise<User | null>;
  updatePassword(id: string, password: string): Promise<User>;
}
