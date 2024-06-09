import { Module } from '@nestjs/common';
import {
  CacheModuleOptions,
  CacheStoreFactory,
  CacheModule as NestCacheModule,
} from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { CacheService } from './cache.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const CACHE_SERVICE_TOKEN = Symbol('CacheServiceToken');

@Module({
  providers: [
    {
      provide: CACHE_SERVICE_TOKEN,
      useClass: CacheService,
    },
  ],
  exports: [CACHE_SERVICE_TOKEN],
})
export class CacheModule {}
