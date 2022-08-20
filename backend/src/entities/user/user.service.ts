import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma/prisma.service';
import { ErrorService } from 'common/error/error.service';
import { Role } from 'authorization/enum/role.enum';
import { RoleService } from 'entities/role/role.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly errorService: ErrorService,
    private readonly roleService: RoleService,
  ) {}

  async getAll() {
    try {
      const users = await this.prismaService.user.findMany();

      return {
        message: 'Пользователи успешно получены',
        error: false,
        success: true,
        users,
      };
    } catch (e) {
      throw this.errorService.internal(
        'Ошибка получения пользователей',
        e.message,
      );
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
        user,
      };
    } catch (e) {
      throw this.errorService.internal(
        'Ошибка получения пользователя',
        e.message,
      );
    }
  }

  async getById(id: number) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
        include: { roles: true, tokens: true },
      });

      return {
        message: 'Пользователь успешно получен',
        error: false,
        success: true,
        user,
      };
    } catch (e) {
      throw this.errorService.internal(
        'Ошибка получения пользователя',
        e.message,
      );
    }
  }

  async create(dto) {
    try {
      const user = await this.prismaService.user.create({
        data: dto,
        include: { roles: { select: { role: true } } },
      });

      const { role } = await this.roleService.getByName(Role.User);
      await this.addRole(user.id, role.id);
      user.roles.push({ role });

      return {
        message: 'Пользователь успешно создан',
        error: false,
        success: true,
        user,
      };
    } catch (e) {
      console.error('CREATE_USER_ERROR ', e);
      throw this.errorService.internal(
        'Ошибка создания пользователя',
        e.message,
      );
    }
  }

  async addRole(userId: number, roleId: number) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
      });

      const role = await this.prismaService.role.findUnique({
        where: { id: roleId },
      });

      if (!user || !role) {
        throw this.errorService.internal(
          'Нет такого пользователя или роли',
          'Ошибка. Нет пользователя или роли',
        );
      }

      await this.prismaService.userRole.create({
        data: { roleId: role.id, userId: user.id },
      });

      return {
        message: 'Роль успешно добавлена',
        error: false,
        success: true,
        role,
        user,
      };
    } catch (e) {
      console.error('ADD_ROLE_ERROR ', e);
      throw this.errorService.internal(
        'Ошибка добавления роли пользователю',
        e.message,
      );
    }
  }

  async update(id: number, dto) {
    try {
      const user = await this.prismaService.user.update({
        where: { id },
        data: dto,
        include: { roles: true, tokens: true },
      });

      return {
        message: 'Пользователь успешно обновлён',
        error: false,
        success: true,
        user,
      };
    } catch (e) {
      throw this.errorService.internal(
        'Ошибка обновления пользователя',
        e.message,
      );
    }
  }

  async delete(id: number) {
    try {
      const user = await this.prismaService.user.update({
        where: { id },
        data: { deletedAt: Date.now().toString() },
      });

      return {
        message: 'Пользователь успешно удалён',
        error: false,
        success: true,
        user,
      };
    } catch (e) {
      throw this.errorService.internal(
        'Ошибка удаления пользователя',
        e.message,
      );
    }
  }
}
