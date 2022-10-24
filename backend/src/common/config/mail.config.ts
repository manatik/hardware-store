import { ConfigService } from '@nestjs/config';
import { MailerOptions } from '@nestjs-modules/mailer';
import { join } from 'path';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

export const getMailConfig = async (configService: ConfigService): Promise<MailerOptions> => ({
  transport: {
    host: configService.get('MAIL_HOST'),
    port: 465,
    secure: true,
    auth: {
      user: configService.get('MAIL_USER'),
      pass: configService.get('MAIL_PASSWORD'),
    },
  },
  defaults: {
    from: `"No Reply" <${''}>`,
  },
  template: {
    dir: join(process.cwd(), 'email/templates'),
    adapter: new PugAdapter(),
    options: {
      strict: true,
    },
  },
});
