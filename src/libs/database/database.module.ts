import { EnvConfig } from '@/config/envs.config';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        console.log({ config });
        return {
          type: 'postgres',
          host: EnvConfig().host,
          port: EnvConfig().port,
          username: config.get('user'),
          password: config.get('password'),
          database: config.get('database'),
          autoLoadEntities: true,
          synchronize: false,
          logging: true,
          entities: ['src/modules/**/domain/entity/*.ts'],
          migrations: ['src/migration/**/*.ts'],
          subscribers: ['src/subscriber/**/*.ts'],
          cli: {
            entitiesDir: 'src/modules',
            migrationsDir: 'src/migration',
            subscribersDir: 'src/subscriber',
          },
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
