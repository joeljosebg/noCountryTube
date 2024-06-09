import { DatabaseModule } from '@/libs/database/database.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/modules/users/domain/entities/user.entity';
import { UsersController } from './presentations/users.controller';
import { UserService } from './applications/services/user/user.service';
import { UserRepository } from './infrastructure/repository/user.repository';
import {
  TOKEN_SERVICE_TOKEN,
  USER_REPOSITORY_TOKEN,
  USER_SERVICE_TOKEN,
} from './provider.token';
import { BcryptModule } from '@/libs/bcrypt/bcrypt.module';
import { MailModule } from '@/libs/mailer/mailer.module';
import { TokenService } from './applications/services/user/token.service';
import { CacheModule } from '@/libs/cache/cache.module';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([User]),
    BcryptModule,
    MailModule,
    CacheModule,
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: USER_SERVICE_TOKEN,
      useClass: UserService,
    },
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepository,
    },
    {
      provide: TOKEN_SERVICE_TOKEN,
      useClass: TokenService,
    },
  ],
  exports: [USER_SERVICE_TOKEN, TOKEN_SERVICE_TOKEN],
})
export class UsersModule {}
