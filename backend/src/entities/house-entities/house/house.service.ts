import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma-service/prisma.service';
import { ErrorService } from '@error/error.service';

@Injectable()
export class HouseService {
  constructor(private readonly prismaService: PrismaService, private readonly errorService: ErrorService) {}

  async getAll() {
    try {
      const products = await this.prismaService.house.findMany({ where: { deleted: null } });

      return this.errorService.success('Продукты успешно получены', { products });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения продуктов', e.message);
    }
  }

  async getById(id: string) {
    try {
      const product = await this.prismaService.house.findFirst({ where: { id, deleted: null } });

      return this.errorService.success('Продукт успешно получен', { product });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения Продукта', e.message);
    }
  }

  async add(dto) {
    try {
      const product = await this.prismaService.house.create({ data: dto });

      return this.errorService.success('Продукт успешно добавлен', { product });
    } catch (e) {
      return this.errorService.internal('Ошибка добавления продукта', e.message);
    }
  }

  async update(id: string, dto) {
    try {
      const product = await this.prismaService.house.update({ where: { id }, data: dto });

      return this.errorService.success('Продукт успешно обновлен', { product });
    } catch (e) {
      throw this.errorService.internal('Ошибка обновления продукта', e.message);
    }
  }

  async remove(id: string) {
    try {
      const product = await this.prismaService.house.update({ where: { id }, data: { deleted: new Date() } });

      return this.errorService.success('Продукт успешно удален', { product });
    } catch (e) {
      throw this.errorService.internal('Ошибка удаления продута', e.message);
    }
  }
}
