import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  hiUser() {
    return 'Hi Nikitich';
  }
}
