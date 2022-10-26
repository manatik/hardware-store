import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'entities/user/user.service';
import { PrismaService } from 'database/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { ErrorService } from 'common/error/error.service';
import * as dayjs from 'dayjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthorizationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
    private readonly errorService: ErrorService,
    private readonly configService: ConfigService,
  ) {}

  async login(dto: LoginDto) {
    const { user } = await this.userService.getByEmail(dto.email, { withPassword: true, withRoles: true });

    if (!user) {
      throw this.errorService.badRequest('Пользователя с таким E-mail не существует');
    }

    const isValidPassword = await bcrypt.compare(dto.password, user.password);

    if (!isValidPassword) {
      throw this.errorService.badRequest('Неверный пароль');
    }

    if (user.deleted) {
      throw this.errorService.badRequest('Пользователь заблокирован');
    }

    const payload = { email: user.email, roles: user.roles, id: user.id };

    const refreshToken = await this.generateRefreshToken(payload, user.id);
    const accessToken = await this.generateAccessToken(payload);

    return {
      accessToken,
      refreshToken,
    };
  }

  async register(dto: RegisterDto) {
    dto.password = await bcrypt.hash(dto.password, 10);

    const { user } = await this.userService.create(dto);

    const payload = { email: user.email, roles: user.roles, id: user.id };

    const refreshToken = await this.generateRefreshToken(payload, user.id);
    const accessToken = await this.generateAccessToken(payload);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(cookies) {
    try {
      const refreshToken = cookies['r_t'];

      const refreshTokenInfo = this.jwtService.verify(refreshToken);

      const expireIn = dayjs.unix(refreshTokenInfo.exp).toISOString();

      const { user } = await this.userService.getByEmail(refreshTokenInfo.email, { withRoles: true });

      if (!user || user.deleted) {
        await this.prismaService.userToken.delete({
          where: { token: refreshToken },
        });
        throw this.errorService.badRequest('Пользователь удалён или заблокирован');
      }

      const payload = { email: user.email, roles: user.roles, id: user.id };

      if (dayjs().diff(expireIn, 'millisecond') > 0) {
        const refreshToken = await this.generateRefreshToken(payload, user.id);
        const accessToken = await this.generateAccessToken(payload);

        return { accessToken, refreshToken };
      }

      const accessToken = await this.generateAccessToken(payload);

      return { accessToken, refreshToken: null };
    } catch (e) {
      throw this.errorService.internal('Ошибка обновления токена', JSON.stringify(e));
    }
  }

  private async generateRefreshToken(payload: any, userId: string) {
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '30d',
      secret: this.configService.get('JWT_SECRET'),
    });
    const expireInDate = dayjs().add(30, 'days').toISOString();

    const findToken = await this.prismaService.userToken.findFirst({
      where: { userId: userId },
    });

    if (findToken) {
      await this.prismaService.userToken.update({
        where: { id: findToken.id },
        data: { token: refreshToken, expireIn: expireInDate, userId: userId },
      });

      return refreshToken;
    }

    await this.prismaService.userToken.create({
      data: {
        token: refreshToken,
        expireIn: expireInDate,
        userId: userId,
      },
    });

    return refreshToken;
  }

  private async generateAccessToken(payload: any) {
    return this.jwtService.signAsync(payload, {
      expiresIn: '24h',
      secret: this.configService.get('JWT_SECRET'),
    });
  }
}
