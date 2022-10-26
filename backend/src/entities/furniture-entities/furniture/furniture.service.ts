import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma/prisma.service';
import { ErrorService } from 'common/error/error.service';
import { CreateFurnitureDto } from 'entities/furniture-entities/furniture/dto/create-furniture.dto';
import { UpdateFurnitureDto } from './dto/update-furniture.dto';
import { idsArrayToArrayObjects } from '../../../common/utils/utils';
import { FurnitureAllQuery } from './dto/furniture-all.query';
import { DeleteFurnitureQuery } from './dto/delete-furniture.query';

@Injectable()
export class FurnitureService {
  constructor(private readonly prismaService: PrismaService, private readonly errorService: ErrorService) {}

  async getAll({ deleted }: FurnitureAllQuery) {
    try {
      const products = await this.prismaService.furniture.findMany({
        where: deleted ? undefined : { deleted: { in: null } },
        select: { category: true, features: true, deleted: deleted || false },
      });

      return this.errorService.success('Продукты успешно получены', {
        products,
      });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения продуктов', e.message);
    }
  }

  async getById(id: number) {
    try {
      const product = await this.prismaService.furniture.findFirst({
        where: { id, deleted: { in: null } },
        include: { category: true, features: true },
      });

      return this.errorService.success('Продукт успешно получен', { product });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения Продукта', e.message);
    }
  }

  async add(dto: CreateFurnitureDto) {
    try {
      const duplicate = await this.prismaService.furniture.findFirst({ where: { article: dto.article } });

      if (duplicate) {
        throw new Error(`Продукт с артикулом - ${dto.article} уже существует`);
      }

      const product = await this.prismaService.furniture.create({
        data: {
          ...dto,
          features: { connect: idsArrayToArrayObjects(dto.features) },
          photos: { connect: idsArrayToArrayObjects(dto.photos) },
        },
      });

      return this.errorService.success('Продукт успешно добавлен', { product });
    } catch (e) {
      return this.errorService.internal('Ошибка добавления продукта', e.message);
    }
  }

  async update(id: number, dto: UpdateFurnitureDto) {
    try {
      const product = await this.prismaService.furniture.update({
        where: { id },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        data: {
          ...dto,
          features: dto.features?.length ? { set: [], connect: idsArrayToArrayObjects(dto.features) } : { set: [] },
          photos: dto.photos?.length ? { set: [], connect: idsArrayToArrayObjects(dto.photos) } : { set: [] },
        },
      });

      return this.errorService.success('Продукт успешно обновлен', { product });
    } catch (e) {
      throw this.errorService.internal('Ошибка обновления продукта', e.message);
    }
  }

  async remove(id: number, query: DeleteFurnitureQuery) {
    try {
      const furnitureIsExist = await this.getById(id);

      if (!furnitureIsExist) {
        throw this.errorService.badRequest(`Продукта с id=${id} не существует`);
      }

      let product;

      if (query.hard) {
        product = await this.prismaService.furniture.delete({ where: { id } });
      } else {
        product = await this.prismaService.furniture.update({
          where: { id },
          data: { deleted: new Date() },
        });
      }

      return this.errorService.success('Продукт успешно удален', { product });
    } catch (e) {
      throw this.errorService.internal('Ошибка удаления продута', e.message);
    }
  }
}
