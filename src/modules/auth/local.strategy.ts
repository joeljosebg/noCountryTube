import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'userName' });
  }

  async validate(userName: string, password: string): Promise<any> {
    console.log({ userName });
    const user = await this.authService.validateUser(userName, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
