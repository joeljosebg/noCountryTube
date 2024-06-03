import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email); 
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const {email, password } = user;
    
    if(!email || !password) {
      throw new BadRequestException('Username or password is missing');
    }
    const logUser = await this.usersService.findOne(email);
    if(!logUser) {
      throw new BadRequestException('User not found');
    }
    const validateUser =await this.validateUser(email, password);
    if(!validateUser) {
      throw new BadRequestException('Invalid username or password');
    } else {
        const payload = { username: logUser.username, sub: logUser.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
  }

}