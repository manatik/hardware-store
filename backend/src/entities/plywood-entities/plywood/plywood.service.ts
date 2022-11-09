import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma-service/prisma.service';
import { ErrorService } from '@error/error.service';
import { CreatePlywoodDto } from './dto/create-plywood.dto';
import { DeletePlywoodQuery } from './dto/delete-plywood.query';
import { UpdatePlywoodDto } from './dto/update-plywood.dto';
import { idsArrayToArrayOfObjects } from '@utils/utils';
import { PlywoodAllQuery } from './dto/plywood-all.query';

@Injectable()
export class PlywoodService {
  constructor(private readonly prismaService: PrismaService, private readonly errorService: ErrorService) {}

  async getAll({ deleted = false }: PlywoodAllQuery) {
    try {
      const products = await this.prismaService.plywood.findMany({
        where: deleted ? undefined : { deleted: null },
        select: {
          id: true,
          article: true,
          available: true,
          categoryId: true,
          name: true,
          description: true,
          price: true,
          widths: true,
          types: true,
          formats: true,
          surfaceTypes: true,
          category: true,
          sorts: true,
          coatingDensity: true,
          features: true,
          photos: true,
          createdAt: true,
          updatedAt: true,
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
      const product = await this.prismaService.plywood.findFirst({
        where: { id, deleted: null },
        include: {
          formats: true,
          surfaceTypes: true,
          category: true,
          sorts: true,
          coatingDensity: true,
          features: true,
          photos: true,
          types: true,
          widths: true,
        },
      });

      return this.errorService.success('Продукт успешно получен', { product });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения Продукта', e.message);
    }
  }

  async add(dto: CreatePlywoodDto) {
    try {
      const duplicate = await this.prismaService.plywood.findFirst({ where: { article: dto.article } });

      if (duplicate) {
        throw new Error(`Продукт с артикулом - ${dto.article} уже существует`);
      }

      const product = await this.prismaService.plywood.create({
        data: {
          ...dto,
          sorts: { connect: idsArrayToArrayOfObjects(dto.sorts) },
          formats: { connect: idsArrayToArrayOfObjects(dto.formats) },
          surfaceTypes: { connect: idsArrayToArrayOfObjects(dto.surfaceTypes) },
          types: { connect: idsArrayToArrayOfObjects(dto.types) },
          coatingDensity: { connect: idsArrayToArrayOfObjects(dto.coatingDensity) },
          widths: { connect: idsArrayToArrayOfObjects(dto.widths) },
          photos: { connect: idsArrayToArrayOfObjects(dto.photos) },
        },
      });

      return this.errorService.success('Продукт успешно добавлен', { product });
    } catch (e) {
      throw this.errorService.internal('Ошибка добавления продукта', e.message);
    }
  }

  async update(id: string, dto: UpdatePlywoodDto) {
    try {
      const duplicate = await this.prismaService.plywood.findFirst({
        where: { article: dto.article, id: { not: id } },
      });

      if (duplicate) {
        throw new Error(`Артикул ${dto.article} уже существует`);
      }

      const product = await this.prismaService.plywood.update({
        where: { id },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        data: {
          ...dto,
          formats: dto.formats?.length ? { set: [], connect: idsArrayToArrayOfObjects(dto.formats) } : { set: [] },
          surfaceTypes: dto.surfaceTypes?.length
            ? { set: [], connect: idsArrayToArrayOfObjects(dto.surfaceTypes) }
            : { set: [] },
          types: dto.types?.length ? { set: [], connect: idsArrayToArrayOfObjects(dto.types) } : { set: [] },
          sorts: dto.sorts?.length ? { set: [], connect: idsArrayToArrayOfObjects(dto.sorts) } : { set: [] },
          coatingDensity: dto.coatingDensity?.length
            ? { set: [], connect: idsArrayToArrayOfObjects(dto.coatingDensity) }
            : { set: [] },
          widths: dto.widths?.length ? { set: [], connect: idsArrayToArrayOfObjects(dto.widths) } : { set: [] },
          photos: dto.photos?.length ? { set: [], connect: idsArrayToArrayOfObjects(dto.photos) } : { set: [] },
        },
      });

      return this.errorService.success('Продукт успешно обновлен', { product });
    } catch (e) {
      throw this.errorService.internal('Ошибка обновления продукта', e.message);
    }
  }

  async remove(id: string, query: DeletePlywoodQuery) {
    try {
      const plywoodIsExist = await this.getById(id);

      if (!plywoodIsExist.product) {
        throw this.errorService.badRequest(`Продукта с id=${id} не существует`);
      }

      let product;

      if (query.hard) {
        product = await this.prismaService.plywood.delete({ where: { id } });
      } else {
        product = await this.prismaService.plywood.update({
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
