import { UserService } from '@/modules/users/applications/services/user/user.service';
import { User } from '@/modules/users/domain/entities/user.entity';
import { UserServiceInterface } from '@/modules/users/domain/services/user-service.interface';
import { USER_SERVICE_TOKEN } from '@/modules/users/provider.token';
import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_SERVICE_TOKEN) private usersService: UserServiceInterface,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    console.log({ user, password: user.password });
    if (user) {
      const compare = await bcrypt.compare(password, user.password);
      if (compare) {
        return { ...user, password: undefined };
      }
    }
    return null;
  }

  async validateUserById(id: string): Promise<any> {
    const user = await this.usersService.getUser(id);
    if (user !== undefined) {
      return { ...user, password: undefined };
    }
    return null;
  }

  async login(user: User) {
    console.log({
      login: true,
      user,
    });
    const payload = { userId: user.id, email: user.email, sub: user.id };
    const accessTokenExpiresIn = 24 * 60 * 60; // Tiempo en segundos
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: accessTokenExpiresIn,
    });
    const refreshTokenExpiresIn = 72 * 60 * 60;
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('jwtRefreshSecret'),
      expiresIn: refreshTokenExpiresIn,
    });
    const accessTokenExpiry =
      new Date().getTime() + accessTokenExpiresIn * 1000;
    const refreshTokenExpiry =
      new Date().getTime() + refreshTokenExpiresIn * 1000;
    return {
      accessToken,
      refreshToken,
      email: user.email,
      fullName: user.lastName + ' ' + user.firstName,
      id: user.id,
      accessTokenExpiry,
      refreshTokenExpiry,
    };
  }

  async refresh(
    refreshToken: string,
  ): Promise<{ accessToken: string; accessTokenExpiry: number }> {
    let decoded;

    try {
      decoded = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('jwtRefreshSecret'),
      });
    } catch (e) {
      console.error(e);
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.validateUserById(decoded.userId);

    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const payload = { userId: user.id, email: user.email, sub: user.id };
    const accessTokenExpiresIn = 24 * 60 * 60;
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: accessTokenExpiresIn,
    });

    const accessTokenExpiry =
      new Date().getTime() + accessTokenExpiresIn * 1000;
    return { accessToken, accessTokenExpiry };
  }
}
