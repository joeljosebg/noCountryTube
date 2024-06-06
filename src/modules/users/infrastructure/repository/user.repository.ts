import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../applications/dtos/crear-user.dto';
import { User } from '../../domain/entities/user.entity';
import { UserRepositoryPort } from '../../domain/port/user-repository.port';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
    return user;
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find({
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        birthday: true,
        phone: true,
        isActive: true,
        photo: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async getUser(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async updateUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { username },
    });
  }
}
