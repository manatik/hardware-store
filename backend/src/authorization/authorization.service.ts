import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'entities/user/user.service';
import { PrismaService } from 'database/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { ErrorService } from 'common/error/error.service';
import * as dayjs from 'dayjs';
import { FastifyRequest } from 'fastify';

@Injectable()
export class AuthorizationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
    private readonly errorService: ErrorService,
  ) {}

  async login(dto: LoginDto) {
    const { user } = await this.userService.getByEmail(dto.email);

    if (!user) {
      throw this.errorService.badRequest(
        'Пользователя с таким E-mail не существует',
      );
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
    const accessToken = this.generateAccessToken(payload);

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
    const accessToken = this.generateAccessToken(payload);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(req: FastifyRequest) {
    try {
      const refreshToken = req.cookies['r_t'];

      const refreshTokenInfo = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET,
      });

      const expireIn = dayjs.unix(refreshTokenInfo.exp).toISOString();

      const { user } = await this.userService.getByEmail(
        refreshTokenInfo.email,
      );

      if (!user || user.deleted) {
        await this.prismaService.userToken.delete({
          where: { token: refreshToken },
        });
        throw this.errorService.badRequest(
          'Пользователь удалён или заблокирован',
        );
      }

      const payload = { email: user.email, roles: user.roles, id: user.id };

      if (dayjs().diff(expireIn, 'millisecond') > 0) {
        const refreshToken = await this.generateRefreshToken(payload, user.id);
        const accessToken = this.generateAccessToken(payload);

        return { accessToken, refreshToken };
      }

      const accessToken = this.generateAccessToken(payload);

      return { accessToken, refreshToken: null };
    } catch (e) {
      throw this.errorService.internal(
        'Ошибка обновления токена',
        JSON.stringify(e),
      );
    }
  }

  private async generateRefreshToken(payload: any, idUser: number) {
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '30d',
      secret: process.env.JWT_SECRET,
    });
    const expireInDate = dayjs().add(30, 'days').toISOString();

    const findToken = await this.prismaService.userToken.findFirst({
      where: { userId: idUser },
    });

    if (findToken) {
      await this.prismaService.userToken.update({
        where: { id: findToken.id },
        data: { token: refreshToken, expireIn: expireInDate, userId: idUser },
      });

      return refreshToken;
    }

    await this.prismaService.userToken.create({
      data: {
        token: refreshToken,
        expireIn: expireInDate,
        userId: idUser,
      },
    });

    return refreshToken;
  }

  private generateAccessToken(payload: any) {
    return this.jwtService.sign(payload, {
      expiresIn: '24h',
      secret: process.env.JWT_SECRET,
    });
  }
}
