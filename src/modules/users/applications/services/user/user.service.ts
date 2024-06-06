import { UserServiceInterface } from '@/modules/users/domain/services/user-service.interface';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/crear-user.dto';
import { User } from '@/modules/users/domain/entities/user.entity';
import { USER_REPOSITORY_TOKEN } from '@/modules/users/provider.token';
import { UserRepositoryPort } from '@/modules/users/domain/port/user-repository.port';
import { UserRepository } from '@/modules/users/infrastructure/repository/user.repository';
import { BCRYPT_SERVICE_TOKEN } from '@/libs/bcrypt/bcrypt.module';
import { BcryptService } from '@/libs/bcrypt/bcrypt.service';
import { UserResponseDto } from '../../dtos/create-user-response.dto';
import { SaveOptions, RemoveOptions } from 'typeorm';
import { GetUsersResponseDto } from '../../dtos/get-users-response.dto';
import { SuccessResponseDto } from '../../dtos/success-response.dto';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @Inject(BCRYPT_SERVICE_TOKEN) private bcryptService: BcryptService,
    @Inject(USER_REPOSITORY_TOKEN) private userRepository: UserRepositoryPort,
  ) {}

  async createUser(user: CreateUserDto): Promise<UserResponseDto> {
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

    const userSave = await this.userRepository.createUser({
      ...user,
      password: hashedPassword,
    });
    return {
      success: true,
      data: {
        ...userSave,
        password: '',
      },
    } as UserResponseDto;
  }
  async getUsers(): Promise<GetUsersResponseDto> {
    const users = await this.userRepository.getUsers();
    return {
      success: true,
      data: users,
    } as GetUsersResponseDto;
  }
  async getUser(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.getUser(id);

    return {
      success: true,
      data: { ...user, password: '' },
    } as UserResponseDto;
  }
  async updateUser(id: string, userUdate: User): Promise<UserResponseDto> {
    const user = await this.userRepository.updateUser(id, userUdate);
    return {
      success: true,
      data: { ...user, password: '' },
    } as UserResponseDto;
  }
  async deleteUser(id: string): Promise<SuccessResponseDto> {
    const user = await this.userRepository.deleteUser(id);
    return {
      success: true,
    };
  }
}
