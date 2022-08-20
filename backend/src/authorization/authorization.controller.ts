import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthorizationService } from 'authorization/authorization.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from './decorators/public.decorator';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ErrorService } from 'common/error/error.service';
import * as dayjs from 'dayjs';

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
    res.setCookie('a_t', accessToken, {
      httpOnly: true,
      expires: dayjs().add(30, 'day').toDate(),
    });
    res.setCookie('r_t', refreshToken, {
      httpOnly: true,
      expires: dayjs().add(30, 'day').toDate(),
    });
    res.send(this.errorService.success('Успешный вход'));
  }

  @Public()
  @Post('/register')
  async register(@Body() dto: RegisterDto, @Res() res: FastifyReply) {
    const { refreshToken, accessToken } = await this.authService.register(dto);
    res.setCookie('a_t', accessToken);
    res.setCookie('r_t', refreshToken);
    res.send(this.errorService.success('Успешная регистрация'));
  }

  @Get('/refresh')
  async refresh(@Req() req: FastifyRequest) {
    return this.authService.refresh(req);
  }
}
