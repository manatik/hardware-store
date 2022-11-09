import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { getMailConfig } from '@config/mail.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ErrorModule } from '@error/error.module';

@Module({
  imports: [
    ErrorModule,
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getMailConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService, ConfigService],
  exports: [],
})
export class EmailModule {}
