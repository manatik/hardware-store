import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma-service/prisma.service';
import { ErrorService } from '@error/error.service';
import { UpdateTypeDto } from './dto/update-type.dto';
import { CreateTypeDto } from './dto/create-type.dto';

@Injectable()
export class TypeService {
  constructor(private readonly prismaService: PrismaService, private readonly errorService: ErrorService) {}

  async getAll() {
    try {
      const allItems = await this.prismaService.plywoodType.findMany();
      return this.errorService.success('Успешно', { data: allItems });
    } catch (e) {
      return this.errorService.internal('Ошибка', e.message);
    }
  }

  async getById(id: string) {
    try {
      const item = await this.prismaService.plywoodType.findFirst({ where: { id } });
      return this.errorService.success('Успешно', { data: item });
    } catch (e) {
      return this.errorService.internal('Ошибка', e.message);
    }
  }

  async add(dto: CreateTypeDto) {
    try {
      const created = await this.prismaService.plywoodType.create({ data: dto });
      return this.errorService.success('Успешно', { data: created });
    } catch (e) {
      return this.errorService.internal('Ошибка', e.message);
    }
  }

  async update(id: string, dto: UpdateTypeDto) {
    try {
      const duplicate = await this.prismaService.plywoodType.findFirst({ where: { name: dto.name, id: { not: id } } });

      if (duplicate) {
        throw new Error(`Тип с названием - ${dto.name} уже существует`);
      }

      const updated = await this.prismaService.plywoodType.update({ where: { id }, data: dto });
      return this.errorService.success('Успешно', { data: updated });
    } catch (e) {
      return this.errorService.internal('Ошибка', e.message);
    }
  }

  async remove(id: string) {
    try {
      const removed = await this.prismaService.plywoodType.delete({ where: { id } });
      return this.errorService.success('Успешно', { data: removed });
    } catch (e) {
      return this.errorService.internal('Ошибка', e.message);
    }
  }
}
