import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthorizationService } from 'authorization/authorization.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from './decorators/public.decorator';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ErrorService } from 'common/error/error.service';

@Controller('auth')
export class AuthorizationController {
  constructor(
    private readonly authService: AuthorizationService,
    private readonly errorService: ErrorService,
  ) {}

  @Public()
  @Post('/login')
  async login(@Body() dto: LoginDto, @Res() res: FastifyReply) {
    const { refreshToken, accessToken } = await this.authService.login(dto);
    res.setCookie('r_t', refreshToken, { httpOnly: true });
    res.send(this.errorService.success('Успешный вход', { accessToken }));
  }

  @Public()
  @Post('/register')
  async register(@Body() dto: RegisterDto, @Res() res: FastifyReply) {
    const { refreshToken, accessToken } = await this.authService.register(dto);
    res.setCookie('r_t', refreshToken, { httpOnly: true });
    res.send(this.errorService.success('Успешная регистрация', { accessToken }));
  }

  @Public()
  @Get('/refresh')
  async refresh(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const tokens = await this.authService.refresh(req);

    if (tokens.refreshToken) {
      res.setCookie('r_t', tokens.refreshToken, { httpOnly: true });
    }

    res.send(this.errorService.success('Токены успешно обновлены', { ...tokens }));
  }
}
