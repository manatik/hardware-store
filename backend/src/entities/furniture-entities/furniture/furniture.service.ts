import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma-service/prisma.service';
import { ErrorService } from '@error/error.service';
import { CreateFurnitureDto } from '@furniture/furniture/dto/create-furniture.dto';
import { UpdateFurnitureDto } from './dto/update-furniture.dto';
import { idsArrayToArrayOfObjects } from '@utils/utils';
import { FurnitureAllQuery } from './dto/furniture-all.query';
import { DeleteFurnitureQuery } from './dto/delete-furniture.query';

@Injectable()
export class FurnitureService {
  constructor(private readonly prismaService: PrismaService, private readonly errorService: ErrorService) {}

  async getAll({ deleted = false }: FurnitureAllQuery) {
    try {
      const products = await this.prismaService.furniture.findMany({
        where: deleted ? undefined : { deleted: null },
        select: {
          parameters: true,
          category: true,
          features: true,
          description: true,
          updatedAt: true,
          price: true,
          createdAt: true,
          available: true,
          categoryId: true,
          name: true,
          photos: true,
          article: true,
          depth: true,
          height: true,
          id: true,
          width: true,
          position: true,
          deleted: deleted,
        },
        orderBy: {
          position: 'asc',
        },
      });

      return this.errorService.success('Продукты успешно получены', {
        products,
      });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения продуктов', e.message);
    }
  }

  async getById(id: string) {
    try {
      const product = await this.prismaService.furniture.findFirst({
        where: { id, deleted: null },
        include: { category: true, features: true, photos: true, parameters: true },
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
          features: { connect: idsArrayToArrayOfObjects(dto.features) },
          photos: { connect: idsArrayToArrayOfObjects(dto.photos) },
          parameters: { connect: idsArrayToArrayOfObjects(dto.parameters) },
        },
      });

      return this.errorService.success('Продукт успешно добавлен', { product });
    } catch (e) {
      return this.errorService.internal('Ошибка добавления продукта', e.message);
    }
  }

  async update(id: string, dto: UpdateFurnitureDto) {
    try {
      const product = await this.prismaService.furniture.update({
        where: { id },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        data: {
          ...dto,
          features: dto.features?.length ? { set: [], connect: idsArrayToArrayOfObjects(dto.features) } : { set: [] },
          photos: dto.photos?.length ? { set: [], connect: idsArrayToArrayOfObjects(dto.photos) } : { set: [] },
          parameters: dto.parameters?.length
            ? { set: [], connect: idsArrayToArrayOfObjects(dto.parameters) }
            : { set: [] },
        },
      });

      return this.errorService.success('Продукт успешно обновлен', { product });
    } catch (e) {
      throw this.errorService.internal('Ошибка обновления продукта', e.message);
    }
  }

  async remove(id: string, query: DeleteFurnitureQuery) {
    try {
      const furnitureIsExist = await this.getById(id);

      if (!furnitureIsExist.product) {
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
