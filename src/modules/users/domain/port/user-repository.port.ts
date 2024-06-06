import { CreateUserDto } from '@/modules/users/applications/dtos/crear-user.dto';
import { User } from '@/modules/users/domain/entities/user.entity';

export interface UserRepositoryPort {
  createUser(user: CreateUserDto): Promise<User>;
  updateUser(user: User): Promise<User>;
  deleteUser(id: string): Promise<void>;
  getUser(id: string): Promise<User>;
  getUsers(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
}
