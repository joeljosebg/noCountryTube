import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { BcryptService } from '../auth/bcrypt.service';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private bcryptService: BcryptService,
  ) {}
  
  async create(createUserDto: CreateUserDto) {
    
    let {email, username, firstName, lastName, password, birthday, phone} = createUserDto;
    
    try{
      
      if(!email || !username || !firstName || !lastName || !password || !birthday || !phone) {
        throw new BadRequestException('Error creating user',
        { cause: new Error(), 
          description: 'User is missing some required fields'  
        })
      }
      
      const userEmail = await this.userRepository.findOne({ where: { email } });
      if(userEmail) {
        throw new BadRequestException('Error creating user',
        { cause: new Error(), 
          description: 'User already exists'  
        })
      }
      const userUsername = await this.userRepository.findOne({ where: { username } });
      if(userUsername) {
        throw new BadRequestException('Error creating user',
        { cause: new Error(), 
          description: 'UserName already taken' 
        })
      }
  
      const hashedPassword = await this.bcryptService.hashPassword(password);

      const newUser = await this.userRepository.save({
        email,
        username,
        firstName,
        lastName,
        password: hashedPassword,
        birthday,
        phone
      });

      return newUser;
    }

    catch(e){
      throw new BadRequestException('Something bad happened', 
      { cause: new Error(), 
        description: `there was an error creating the user: ${e}`
      })
    }
  }


  findAll() {
    return `This action returns all users`;
  }

  async findOne(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('User not found',
      { cause: new Error(), 
        description: `User with email ${email} not found`
      })
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
