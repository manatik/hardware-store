import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { SendEmailDto } from './dto/send-email.dto';
import { ErrorService } from '@error/error.service';

@Injectable()
export class EmailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
    private errorService: ErrorService,
  ) {}

  async sendOrder({ email, fio, phone, message, products = {} }: SendEmailDto) {
    try {
      const typeMail = Object.keys(products).length
        ? `Информация о заказе от ${email}`
        : `Запрос на обратный звонок ${phone}`;

      await this.mailerService.sendMail({
        to: this.configService.get('MAIL_RECIPIENT'),
        from: this.configService.get('MAIL_USER'),
        subject: typeMail,
        template: join(process.cwd(), 'dist/email/templates/template'),
        context: { email, phone, fio, message, typeMail, products },
      });

      return this.errorService.success('Сообщение успешно отправлено');
    } catch (e) {
      console.error(e);
      return this.errorService.internal('Ошибка отправки E-mail', e.message);
    }
  }
}
