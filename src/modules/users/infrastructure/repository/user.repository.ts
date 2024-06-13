import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../applications/dtos/crear-user.dto';
import { User } from '../../domain/entities/user.entity';
import { UserRepositoryPort } from '../../domain/port/user-repository.port';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { UpdateUserDto } from '../../applications/dtos/update-user.dto';

@Injectable()
export class UserRepository implements UserRepositoryPort {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(data: CreateUserDto): Promise<User> {
    const user = await this.userRepository.save({
      ...data,
      role: 'user',
      isActive: true,
    });
    return user as User;
  }

  async getUsers(): Promise<User[]> {
    const users = this.userRepository.find({
      select: {
        id: true,
        email: true,
        userName: true,
        firstName: true,
        lastName: true,
        birthday: true,
        phone: true,
        isActive: true,
        photo: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return users;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    console.log({ updateUserDto });
    await this.userRepository.update(id, {
      ...updateUserDto,
    });
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async getUser(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }
  async getUserProfileAndVideos(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['videos'],
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async findByUsername(userName: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { userName },
    });
  }
  async updatePassword(id: string, password: string): Promise<User> {
    await this.userRepository.update(id, {
      password,
    });
    return this.userRepository.findOne({ where: { id } }) as Promise<User>;
  }
}
