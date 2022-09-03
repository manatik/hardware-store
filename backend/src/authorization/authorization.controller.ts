import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthorizationService } from 'authorization/authorization.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from './decorators/public.decorator';
import { ErrorService } from 'common/error/error.service';
import { Response } from 'express';

@Controller('auth')
export class AuthorizationController {
  constructor(private readonly authService: AuthorizationService, private readonly errorService: ErrorService) {}

  @Public()
  @Post('/login')
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const { refreshToken, accessToken } = await this.authService.login(dto);
    res.cookie('r_t', refreshToken, { httpOnly: true });
    res.cookie('a_t', accessToken, { httpOnly: true });
    res.json(this.errorService.success('Успешный вход', { accessToken }));
  }

  @Public()
  @Post('/register')
  async register(@Body() dto: RegisterDto, @Res() res: Response) {
    const { refreshToken, accessToken } = await this.authService.register(dto);
    res.cookie('r_t', refreshToken, { httpOnly: true });
    res.cookie('a_t', accessToken, { httpOnly: true });
    res.json(this.errorService.success('Успешная регистрация', { accessToken }));
  }

  @Public()
  @Post('/refresh')
  async refresh(@Body() cookies, @Res() res: Response) {
    const tokens = await this.authService.refresh(cookies);

    if (tokens.refreshToken) {
      res.cookie('r_t', tokens.refreshToken, { httpOnly: true });
    }

    res.json(this.errorService.success('Токены успешно обновлены', { ...tokens }));
  }
}
