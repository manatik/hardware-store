import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma/prisma.service';
import { ErrorService } from 'common/error/error.service';
import { Role } from 'authorization/enum/role.enum';
import { RoleService } from 'entities/role/role.service';
import { UserInfoQuery } from 'entities/user/dto/user-info.query';
import { UserAllQuery } from 'entities/user/dto/user-all.query';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly errorService: ErrorService,
    private readonly roleService: RoleService,
  ) {}

  async getAll({ deleted }: UserAllQuery) {
    try {
      let users;

      if (deleted) {
        users = await this.prismaService.user.findMany({
          select: {
            id: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            deleted: true,
          },
        });
      } else {
        users = await this.prismaService.user.findMany({
          where: { deleted: { in: null } },
          select: {
            id: true,
            email: true,
            createdAt: true,
            updatedAt: true,
          },
        });
      }

      return this.errorService.success('Пользователи успешно получены', { users });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения пользователей', e.message);
    }
  }

  async getByEmail(
    email: string,
    params: { withPassword?: boolean; withRoles?: boolean } = { withPassword: false, withRoles: false },
  ) {
    try {
      const { withRoles, withPassword } = params;

      const user = await this.prismaService.user.findFirst({
        where: { email, deleted: { in: null } },
        select: {
          roles: withRoles ? { select: { role: true } } : false,
          id: true,
          email: true,
          updatedAt: true,
          createdAt: true,
          deleted: true,
          password: withPassword,
        },
      });

      return this.errorService.success('Пользователь успешно получен', { user });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения пользователя', e.message);
    }
  }

  async getById(id: number, query: UserInfoQuery) {
    try {
      const { roles: withRoles } = query;

      const user = await this.prismaService.user.findFirst({
        where: { id, deleted: { in: null } },
        select: {
          roles: withRoles ? { select: { role: true } } : false,
          id: true,
          email: true,
          deleted: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      // @ts-ignore
      if (user.roles?.some(({ role }) => role?.name === Role.Admin)) {
        delete user.roles;
        return this.errorService.success('Пользователь успешно получен', { user: { ...user, isAdmin: true } });
      }

      return this.errorService.success('Пользователь успешно получен', { user });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения пользователя', e.message);
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

      return this.errorService.success('Пользователь успешно создан', { user });
    } catch (e) {
      console.error('CREATE_USER_ERROR ', e);
      throw this.errorService.internal('Ошибка создания пользователя', e.message);
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
        throw this.errorService.internal('Нет такого пользователя или роли', 'Ошибка. Нет пользователя или роли');
      }

      await this.prismaService.userRole.create({
        data: { roleId: role.id, userId: user.id },
      });

      return this.errorService.success('Роль успешно добавлена');
    } catch (e) {
      console.error('ADD_ROLE_ERROR ', e);
      throw this.errorService.internal('Ошибка добавления роли пользователю', e.message);
    }
  }

  async update(id: number, dto) {
    try {
      const user = await this.prismaService.user.update({
        where: { id },
        data: dto,
        include: { roles: true, tokens: true },
      });

      return this.errorService.success('Пользователь успешно обновлён', { user });
    } catch (e) {
      throw this.errorService.internal('Ошибка обновления пользователя', e.message);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.prismaService.user.update({ where: { id }, data: { deleted: new Date() } });

      return this.errorService.success('Пользователь успешно удалён', { user });
    } catch (e) {
      throw this.errorService.internal('Ошибка удаления пользователя', e.message);
    }
  }
}
