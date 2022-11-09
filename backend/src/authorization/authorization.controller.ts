import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthorizationService } from 'authorization/authorization.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from './decorators';
import { ErrorService } from 'common/error/error.service';
import { Response } from 'express';
import { ENDPOINTS, GLOBAL_PREFIXES } from '@consts/endpoints.consts';

enum TOKENS {
  REFRESH = 'r_t',
  ACCESS = 'a_t',
}

@Public()
@Controller(GLOBAL_PREFIXES.AUTH)
export class AuthorizationController {
  constructor(private readonly authService: AuthorizationService, private readonly errorService: ErrorService) {}

  @Post(ENDPOINTS.AUTH.LOGIN)
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const { refreshToken, accessToken } = await this.authService.login(dto);
    res.cookie(TOKENS.REFRESH, refreshToken, { httpOnly: true });
    res.cookie(TOKENS.ACCESS, accessToken, { httpOnly: true });
    res.json(this.errorService.success('Успешный вход', { accessToken }));
  }

  @Post(ENDPOINTS.AUTH.REGISTER)
  async register(@Body() dto: RegisterDto, @Res() res: Response) {
    const { refreshToken, accessToken } = await this.authService.register(dto);
    res.cookie(TOKENS.REFRESH, refreshToken, { httpOnly: true });
    res.cookie(TOKENS.ACCESS, accessToken, { httpOnly: true });
    res.json(this.errorService.success('Успешная регистрация', { accessToken }));
  }

  @Post(ENDPOINTS.AUTH.REFRESH)
  async refresh(@Body() cookies, @Res() res: Response) {
    const tokens = await this.authService.refresh(cookies);

    if (tokens.refreshToken) {
      res.cookie(TOKENS.REFRESH, tokens.refreshToken, { httpOnly: true });
      res.cookie(TOKENS.ACCESS, tokens.accessToken, { httpOnly: true });
    }

    res.json(this.errorService.success('Токены успешно обновлены', { ...tokens }));
  }
}
