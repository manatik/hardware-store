import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { PrismaService } from '@prisma-service/prisma.service';
import { ErrorService } from '@error/error.service';

@Injectable()
export class RoleService {
  constructor(private readonly prismaService: PrismaService, private readonly errorService: ErrorService) {}

  async getAll() {
    try {
      const roles = await this.prismaService.role.findMany();

      return {
        message: 'Роли успешно получены',
        error: false,
        success: true,
        roles,
      };
    } catch (e) {
      throw this.errorService.internal('Ошибка получения ролей', JSON.stringify(e));
    }
  }

  async getById(id: string) {
    try {
      const role = await this.prismaService.role.findUnique({
        where: { id },
        include: { users: true },
      });

      return {
        message: 'Роль успешно получена',
        error: false,
        success: true,
        role,
      };
    } catch (e) {
      throw this.errorService.internal('Ошибка получения роли', JSON.stringify(e));
    }
  }

  async getByName(name: string) {
    try {
      const role = await this.prismaService.role.findUnique({
        where: { name },
        include: { users: true },
      });

      return {
        message: 'Роль успешно получена',
        error: false,
        success: true,
        role,
      };
    } catch (e) {
      throw this.errorService.internal('Ошибка получения роли', JSON.stringify(e));
    }
  }

  async create(dto: CreateRoleDto) {
    try {
      const role = await this.prismaService.role.create({ data: dto });

      return {
        message: 'Роль успешно создана',
        error: false,
        success: true,
        role,
      };
    } catch (e) {
      throw this.errorService.internal('Ошибка создания роли', JSON.stringify(e));
    }
  }

  async update(id: string, dto) {
    try {
      const role = await this.prismaService.role.update({
        where: { id },
        data: dto,
      });

      return {
        message: 'Роль успешно обновлена',
        error: false,
        success: true,
        role,
      };
    } catch (e) {
      throw this.errorService.internal('Ошибка обновления роли', JSON.stringify(e));
    }
  }

  async delete(id: string) {
    try {
      const role = await this.prismaService.role.delete({ where: { id } });

      return {
        message: 'Роль успешно удалена',
        error: false,
        success: true,
        role,
      };
    } catch (e) {
      throw this.errorService.internal('Ошибка удаления роли', JSON.stringify(e));
    }
  }
}
