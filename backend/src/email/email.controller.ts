import { Body, Controller, Get } from '@nestjs/common';
import { EmailService } from './email.service';
import { Public } from '../authorization/decorators/public.decorator';
import { SendEmailDto } from './dto/send-email.dto';

@Public()
@Controller('mail')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Get('send')
  async sendEmail(@Body() dto: SendEmailDto) {
    return await this.emailService.sendOrder(dto);
  }
}
