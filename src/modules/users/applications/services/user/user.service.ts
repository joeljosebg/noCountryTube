import { UserServiceInterface } from '@/modules/users/domain/services/user-service.interface';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/crear-user.dto';
import { User } from '@/modules/users/domain/entities/user.entity';
import { USER_REPOSITORY_TOKEN } from '@/modules/users/provider.token';
import { UserRepositoryPort } from '@/modules/users/domain/port/user-repository.port';
import { UserRepository } from '@/modules/users/infrastructure/repository/user.repository';
import { BCRYPT_SERVICE_TOKEN } from '@/libs/bcrypt/bcrypt.module';
import { BcryptService } from '@/libs/bcrypt/bcrypt.service';
import { ResponseCreateUserDto } from '../../dtos/response-create-user.dto';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @Inject(BCRYPT_SERVICE_TOKEN) private bcryptService: BcryptService,
    @Inject(USER_REPOSITORY_TOKEN) private userRepository: UserRepositoryPort,
  ) {}

  async createUser(user: CreateUserDto): Promise<ResponseCreateUserDto> {
    const hashedPassword = await this.bcryptService.hashPassword(user.password);

    const userEmail = await this.userRepository.findByEmail(user.email);
    if (userEmail) {
      throw new BadRequestException('Error creating user', {
        cause: new Error(),
        description: 'User already exists',
      });
    }

    const userUsername = await this.userRepository.findByUsername(
      user.username,
    );
    if (userUsername) {
      throw new BadRequestException('Error creating user', {
        cause: new Error(),
        description: 'UserName already taken',
      });
    }

    const userSave: User = await this.userRepository.createUser({
      ...user,
      password: hashedPassword,
    });
    return {
      success: true,
      data: { ...userSave, password: '' },
    };
  }
  async getUsers(): Promise<User[]> {
    return this.userRepository.getUsers();
  }
  async getUser(id: number): Promise<User> {
    const user = await this.userRepository.getUser(id);

    return {
      success: true,
      data,
    };
  }
  async updateUser(user: User): Promise<User> {
    return this.userRepository.updateUser(user);
  }
  async deleteUser(id: number): Promise<void> {
    return this.userRepository.deleteUser(id);
  }
}
