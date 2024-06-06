import { DatabaseModule } from '@/libs/database/database.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/modules/users/domain/entities/user.entity';
import { UsersController } from './presentations/users.controller';
import { UserService } from './applications/services/user/user.service';
import { UserRepository } from './infrastructure/repository/user.repository';
import { USER_REPOSITORY_TOKEN, USER_SERVICE_TOKEN } from './provider.token';
import { BcryptModule } from '@/libs/bcrypt/bcrypt.module';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([User]), BcryptModule],
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
  ],
  exports: [USER_SERVICE_TOKEN],
})
export class UsersModule {}
