import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { Public } from '@authorization/decorators';
import { SendEmailDto } from './dto/send-email.dto';
import { ENDPOINTS, GLOBAL_PREFIXES } from '@consts/endpoints.consts';

@Public()
@Controller(GLOBAL_PREFIXES.EMAIL)
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post(ENDPOINTS.EMAIL.SEND)
  async sendEmail(@Body() dto: SendEmailDto) {
    return await this.emailService.sendOrder(dto);
  }
}
