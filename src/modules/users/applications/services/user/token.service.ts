import { Inject, Injectable, Logger } from '@nestjs/common';

import { CACHE_SERVICE_TOKEN } from '@/libs/cache/cache.module';
import { CacheServiceInterface } from '@/libs/cache/cache.interface';
import { TokenServiceInterface } from '@/modules/users/domain/services/token-service.interface';
import { CacheService } from '@/libs/cache/cache.service';

@Injectable()
export class TokenService implements TokenServiceInterface {
  private readonly logger = new Logger(CacheService.name);
  constructor(
    @Inject(CACHE_SERVICE_TOKEN)
    private readonly cacheService: CacheServiceInterface,
  ) {}

  private readonly characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  generateRandomToken(length: number = 10): string {
    let token = '';
    const charactersLength = this.characters.length;
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      token += this.characters.charAt(randomIndex);
    }
    return token;
  }

  async generateToken(userId: string): Promise<string> {
    const token = this.generateRandomToken(6);
    this.logger.debug(
      `Setting value for key: token:${userId} with TTL: ${60 * 15}`,
    );
    const value = await this.cacheService.set(
      `token:${userId}`,
      token,
      60 * 15,
    );
    this.logger.debug(`Value set for key token:${userId}: ${value}`);
    return token;
  }

  async validateToken(userId: string, token: string): Promise<boolean> {
    const storedToken = await this.cacheService.get(`token:${userId}`);
    this.logger.debug(`Stored token: ${storedToken}`);

    if (token === storedToken) {
      await this.cacheService.del(`token:${userId}`);
      return true;
    }

    return false;
  }
}
