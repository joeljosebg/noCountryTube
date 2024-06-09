import { Injectable, Logger } from '@nestjs/common';

import Redis from 'ioredis';

@Injectable()
export class CacheService {
  private readonly logger = new Logger(CacheService.name);
  private client: Redis;

  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    });

    this.client.on('connect', () => {
      this.logger.log('Connected to Redis');
    });

    this.client.on('error', (err) => {
      this.logger.error('Redis error', err);
    });
  }

  async get(key: string): Promise<any> {
    this.logger.debug(`Fetching value for key: ${key}`);
    const value = await this.client.get(key);
    this.logger.debug(`Value for key ${key}: ${value}`);
    return value;
  }

  async set(key: string, value: any, ttl: number): Promise<void> {
    this.logger.debug(`Setting value for key: ${key} with TTL: ${ttl}`);
    await this.client.set(key, value, 'EX', ttl);
    const storedValue = await this.client.get(key);
    this.logger.debug(`Value set for key ${key}: ${storedValue}`);
  }

  async del(key: string): Promise<void> {
    this.logger.debug(`Deleting value for key: ${key}`);
    await this.client.del(key);
    this.logger.debug(`Value deleted for key ${key}`);
  }

  async reset(): Promise<void> {
    this.logger.debug(`Resetting cache`);
    await this.client.flushdb();
    this.logger.debug(`Cache reset`);
  }
}
