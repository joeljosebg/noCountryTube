import { UserServiceInterface } from '@/modules/users_test/domain/services/user-service.interface';
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/crear-user.dto';
import { User } from '@/modules/users_test/domain/entities/user.entity';
import { USER_REPOSITORY_TOKEN } from '@/modules/users_test/provider.token';
import { UserRepositoryPort } from '@/modules/users_test/domain/port/user-repository.port';
import { UserRepository } from '@/modules/users_test/infrastructure/repository/user.repository';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN) private userRepository: UserRepositoryPort,
  ) {}

  createUser(user: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(user);
  }
  async getUsers(): Promise<User[]> {
    return this.userRepository.getUsers();
  }
  async getUser(id: number): Promise<User> {
    return this.userRepository.getUser(id);
  }
  async updateUser(user: User): Promise<User> {
    return this.userRepository.updateUser(user);
  }
  async deleteUser(id: number): Promise<void> {
    return this.userRepository.deleteUser(id);
  }
}
