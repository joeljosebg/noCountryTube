import { CreateUserDto } from '@/modules/users_test/applications/dtos/crear-user.dto';
import { User } from '@/modules/users_test/domain/entities/user.entity';

export interface UserRepositoryPort {
  createUser(user: CreateUserDto): Promise<User>;
  updateUser(user: User): Promise<User>;
  deleteUser(id: number): Promise<void>;
  getUser(id: number): Promise<User>;
  getUsers(): Promise<User[]>;
}
