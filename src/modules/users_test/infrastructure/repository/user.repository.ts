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

  async createUser(user: CreateUserDto): Promise<User> {
    return this.userRepository.save(user);
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUser(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async updateUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
