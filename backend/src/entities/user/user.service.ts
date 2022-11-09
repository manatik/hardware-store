import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma-service/prisma.service';
import { ErrorService } from '@error/error.service';
import { Role } from '@authorization/enum/role.enum';
import { RoleService } from '@role/role.service';
import { UserInfoQuery } from './dto/user-info.query';
import { UserAllQuery } from './dto/user-all.query';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly errorService: ErrorService,
    private readonly roleService: RoleService,
  ) {}

  async getAll({ deleted = false }: UserAllQuery) {
    try {
      const users = await this.prismaService.user.findMany({
        where: deleted ? undefined : { deleted: null },
        select: {
          id: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          deleted: deleted,
        },
      });

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
        where: { email, deleted: null },
        select: {
          roles: withRoles,
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

  async getById(id: string, query: UserInfoQuery) {
    try {
      const { roles: withRoles } = query;

      const user = await this.prismaService.user.findFirst({
        where: { id, deleted: null },
        include: { roles: withRoles },
      });

      if (user.roles?.some((role) => role?.name === Role.Admin)) {
        delete user.roles;
        delete user.password;
        return this.errorService.success('Пользователь успешно получен', { ...user, isAdmin: true });
      }

      delete user.roles;
      delete user.password;

      return this.errorService.success('Пользователь успешно получен', { ...user, isAdmin: false });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения пользователя', e.message);
    }
  }

  async create(dto) {
    try {
      const user = await this.prismaService.user.create({ data: dto, include: { roles: true } });

      const { role } = await this.roleService.getByName(Role.User);
      await this.addRole(user.id, role.id);
      user.roles.push(role);

      return this.errorService.success('Пользователь успешно создан', { user });
    } catch (e) {
      console.error('CREATE_USER_ERROR ', e);
      throw this.errorService.internal('Ошибка создания пользователя', e.message);
    }
  }

  async addRole(userId: string, roleId: string) {
    try {
      await this.checkUserAndRole(userId, roleId);

      await this.prismaService.user.update({ where: { id: userId }, data: { roles: { connect: { id: roleId } } } });

      return this.errorService.success('Роль успешно добавлена');
    } catch (e) {
      console.error('ADD_ROLE_ERROR ', e);
      throw this.errorService.badRequest('Ошибка добавления роли пользователю', e.message);
    }
  }

  async removeRole(userId: string, roleId: string) {
    try {
      await this.checkUserAndRole(userId, roleId);

      await this.prismaService.user.update({ where: { id: userId }, data: { roles: { disconnect: { id: roleId } } } });

      return this.errorService.success('Роль успешно удалена');
    } catch (e) {
      console.error('REMOVE_ROLE_ERROR ', e);
      throw this.errorService.badRequest('Ошибка добавления роли пользователю', e.message);
    }
  }

  async update(id: string, dto) {
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

  async remove(id: string) {
    try {
      const user = await this.prismaService.user.update({ where: { id }, data: { deleted: new Date() } });

      return this.errorService.success('Пользователь успешно удалён', { user });
    } catch (e) {
      throw this.errorService.internal('Ошибка удаления пользователя', e.message);
    }
  }

  private async checkUserAndRole(userId: string, roleId: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    const role = await this.prismaService.role.findUnique({
      where: { id: roleId },
    });

    if (!user || !role) {
      throw this.errorService.internal('Нет такого пользователя или роли', 'Ошибка. Нет пользователя или роли');
    }
  }
}
