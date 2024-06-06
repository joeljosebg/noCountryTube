import { Module } from '@nestjs/common';
import { BcryptService } from '@/libs/bcrypt/bcrypt.service';

export const BCRYPT_SERVICE_TOKEN = 'BcryptServiceToken';

@Module({
  providers: [
    {
      provide: BCRYPT_SERVICE_TOKEN,
      useClass: BcryptService,
    },
  ],
  exports: [BCRYPT_SERVICE_TOKEN],
})
export class BcryptModule {}
