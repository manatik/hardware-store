import { Injectable } from '@nestjs/common';
import { PrismaService } from "../../database/prisma/prisma.service";
import { ErrorService } from "../../common/error/error.service";

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly errorService: ErrorService
  ) {
  }

  async getAll() {
    try {
      const users = await this.prismaService.user.findMany();

      return {
        message: 'Пользователи успешно получены',
        error: false,
        success: true,
        users
      }
    } catch (e) {
      throw this.errorService.internal('Ошибка получения пользователей', JSON.stringify(e));
    }
  }

  async getByEmail(email: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email },
        include: { roles: true, tokens: true },
      });

      return {
        message: 'Пользователь успешно получен',
        error: false,
        success: true,
        user
      };
    } catch (e) {
      throw this.errorService.internal('Ошибка получения пользователя', JSON.stringify(e));
    }
  }

  async getById(id: number) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
        include: { roles: true, tokens: true }
      });

      return {
        message: 'Пользователь успешно получен',
        error: false,
        success: true,
        user
      }
    } catch (e) {
      throw this.errorService.internal('Ошибка получения пользователя', JSON.stringify(e));
    }
  }

  async create(dto) {
    try {
      const user = await this.prismaService.user.create({ data: dto, include: { roles: true, tokens: true } });

      return {
        message: 'Пользователь успешно создан',
        error: false,
        success: true,
        user
      }
    } catch (e) {
      console.error("CREATE_USER_ERROR ", e);
      throw this.errorService.internal('Ошибка создания пользователя', JSON.stringify(e));
    }
  }

  async update(id: number, dto) {
    try {
      const user = await this.prismaService.user.update({
        where: { id },
        data: dto,
        include: { roles: true, tokens: true }
      });

      return {
        message: 'Пользователь успешно обновлён',
        error: false,
        success: true,
        user
      }
    } catch (e) {
      throw this.errorService.internal('Ошибка обновления пользователя', JSON.stringify(e));
    }
  }

  async delete(id: number) {
    try {
      const user = await this.prismaService.user.update({ where: { id }, data: { deletedAt: Date.now().toString() } });

      return {
        message: 'Пользователь успешно удалён',
        error: false,
        success: true,
        user
      }
    } catch (e) {
      throw this.errorService.internal('Ошибка удаления пользователя', JSON.stringify(e));
    }
  }
}