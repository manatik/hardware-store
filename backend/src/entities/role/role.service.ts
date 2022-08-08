import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from 'entities/role/dto/create-role.dto';
import { PrismaService } from 'database/prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private readonly prismaService: PrismaService) {
  }
  async getAll() {
    const roles = await this.prismaService.role.findMany();

    return {
      message: 'Роли успешно получены',
      error: false,
      success: true,
      roles
    }
  }

  async getById(id: number) {}

  async create(dto: CreateRoleDto) {}

  async update(id: number, dto) {}

  async delete(id: number) {}
}