import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma/prisma.service';
import { ErrorService } from 'common/error/error.service';
import { CreatePlywoodDto } from 'entities/plywood/dto/create-plywood.dto';
import { IPlywood } from 'entities/plywood/types/IPlywood.interface';

@Injectable()
export class PlywoodService {
  constructor(private readonly prismaService: PrismaService, private readonly errorService: ErrorService) {}

  async getAll() {
    try {
      const products = (await this.prismaService.plywood.findMany({
        where: { deleted: { in: null } },
      })) as any as IPlywood[];

      return this.errorService.success('Продукты успешно получены', {
        products,
      });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения продуктов', e.message);
    }
  }

  async getById(id: number) {
    try {
      const product = (await this.prismaService.plywood.findFirst({
        where: { id, deleted: { in: null } },
      })) as any as IPlywood;

      return this.errorService.success('Продукт успешно получен', { product });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения Продукта', e.message);
    }
  }

  async add(dto: CreatePlywoodDto) {
    try {
      const product = (await this.prismaService.plywood.create({ data: dto })) as any as IPlywood;

      return this.errorService.success('Продукт успешно добавлен', { product });
    } catch (e) {
      throw this.errorService.internal('Ошибка добавления продукта', e.message);
    }
  }

  async update(id: number, dto) {
    try {
      const product = (await this.prismaService.plywood.update({
        where: { id },
        data: dto,
      })) as any as IPlywood;

      return this.errorService.success('Продукт успешно обновлен', { product });
    } catch (e) {
      throw this.errorService.internal('Ошибка обновления продукта', e.message);
    }
  }

  async remove(id: number) {
    try {
      const product = (await this.prismaService.plywood.update({
        where: { id },
        data: { deleted: new Date() },
      })) as any as IPlywood;

      return this.errorService.success('Продукт успешно удален', { product });
    } catch (e) {
      throw this.errorService.internal('Ошибка удаления продута', e.message);
    }
  }
}
