import { Controller, Get, Post, Req } from '@nestjs/common';
import { AuthorizationService } from 'authorization/authorization.service';

@Controller('auth')
export class AuthorizationController {
  constructor(private readonly authService: AuthorizationService) {
  }
  @Post('/login')
  async login(@Req() dto) {
    return this.authService.login(dto);
  }

  @Post('/register')
  async register(@Req() dto) {
    return this.authService.register(dto);
  }

  @Get('/refresh')
  async refresh() {
    return this.authService.refresh();
  }
}