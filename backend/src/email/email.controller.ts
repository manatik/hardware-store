import { Body, Controller, Get } from '@nestjs/common';
import { EmailService } from './email.service';
import { Public } from '../authorization/decorators/public.decorator';
import { SendEmailDto } from './dto/send-email.dto';
import { ENDPOINTS, GLOBAL_PREFIXES } from '../common/consts/endpoints.consts';

@Public()
@Controller(GLOBAL_PREFIXES.EMAIL)
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Get(ENDPOINTS.EMAIL.SEND)
  async sendEmail(@Body() dto: SendEmailDto) {
    return await this.emailService.sendOrder(dto);
  }
}
