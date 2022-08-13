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

      return this.errorService.success('Пользователи успешно получены', users);
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

      return this.errorService.success('Пользователь успешно получен', user);
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

      return this.errorService.success('Пользователь успешно получен', user);
    } catch (e) {
      throw this.errorService.internal('Ошибка получения пользователя', JSON.stringify(e));
    }
  }

  async create(dto) {
    try {
      const user = await this.prismaService.user.create({ data: dto, include: { roles: true, tokens: true } });

      return this.errorService.success('Пользователь успешно создан', user);
    } catch (e) {
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

      return this.errorService.success('Пользователь успешно обновлён', user);
    } catch (e) {
      throw this.errorService.internal('Ошибка обновления пользователя', JSON.stringify(e));
    }
  }

  async delete(id: number) {
    try {
      const user = await this.prismaService.user.update({ where: { id }, data: { deletedAt: Date.now().toString() } });

      return this.errorService.success('Пользователь успешно удалён', user);
    } catch (e) {
      throw this.errorService.internal('Ошибка удаления пользователя', JSON.stringify(e));
    }
  }
}