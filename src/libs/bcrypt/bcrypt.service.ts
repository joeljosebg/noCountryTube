import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IBcryptService } from './bcrypt-service.interface';

@Injectable()
export class BcryptService implements IBcryptService {
  private readonly saltRounds = 10;

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async comparePssword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
