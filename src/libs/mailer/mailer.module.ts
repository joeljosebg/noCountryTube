import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mailer.service';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export const MAIL_SERVICE_TOKEN = Symbol('MailServiceToken');
@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const templatesDir =
          process.env.NODE_ENV === 'production' ||
          process.env.NODE_ENV === 'development'
            ? join(__dirname, '..', 'libs', 'mailer', 'email-templates')
            : join(__dirname, 'email-templates');
        return {
          transport: {
            host: configService.get<string>('smtpHost'),
            port: configService.get<number>('smtpPort'),
            secure: false,
            auth: {
              user: configService.get<string>('smtpUsername'),
              pass: configService.get<string>('smtpPassword'),
            },
          },
          template: {
            dir: templatesDir,
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
  ],
  providers: [
    {
      provide: MAIL_SERVICE_TOKEN,
      useClass: MailService,
    },
  ],
  exports: [MAIL_SERVICE_TOKEN],
})
export class MailModule {}
