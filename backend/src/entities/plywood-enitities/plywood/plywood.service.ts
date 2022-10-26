import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma/prisma.service';
import { ErrorService } from 'common/error/error.service';
import { CreatePlywoodDto } from './dto/create-plywood.dto';
import { DeletePlywoodQuery } from './dto/delete-plywood.query';
import { UpdatePlywoodDto } from './dto/update-plywood.dto';
import { idsArrayToArrayObjects } from 'common/utils/utils';
import { PlywoodAllQuery } from './dto/plywood-all.query';

@Injectable()
export class PlywoodService {
  constructor(private readonly prismaService: PrismaService, private readonly errorService: ErrorService) {}

  async getAll({ deleted }: PlywoodAllQuery) {
    try {
      const products = await this.prismaService.plywood.findMany({
        where: deleted ? undefined : { deleted: { in: null } },
        select: {
          formats: true,
          surfaceTypes: true,
          category: true,
          sorts: true,
          coatingDensity: true,
          features: true,
          photos: true,
          deleted: deleted || false,
        },
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
      const product = await this.prismaService.plywood.findFirst({
        where: { id, deleted: { in: null } },
        include: {
          formats: true,
          surfaceTypes: true,
          category: true,
          sorts: true,
          coatingDensity: true,
          features: true,
          photos: true,
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
          sorts: { connect: idsArrayToArrayObjects(dto.sorts) },
          formats: { connect: idsArrayToArrayObjects(dto.formats) },
          surfaceTypes: { connect: idsArrayToArrayObjects(dto.surfaceTypes) },
          types: { connect: idsArrayToArrayObjects(dto.types) },
          coatingDensity: { connect: idsArrayToArrayObjects(dto.coatingDensity) },
          widths: { connect: idsArrayToArrayObjects(dto.widths) },
          photos: { connect: idsArrayToArrayObjects(dto.photos) },
        },
      });

      return this.errorService.success('Продукт успешно добавлен', { product });
    } catch (e) {
      throw this.errorService.internal('Ошибка добавления продукта', e.message);
    }
  }

  async update(id: number, dto: UpdatePlywoodDto) {
    try {
      const duplicate = await this.prismaService.plywood.findUnique({ where: { article: dto.article } });

      if (duplicate) {
        throw new Error(`Артикул ${dto.article} уже существует`);
      }

      const product = await this.prismaService.plywood.update({
        where: { id },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        data: {
          ...dto,
          formats: dto.formats?.length ? { set: [], connect: idsArrayToArrayObjects(dto.formats) } : { set: [] },
          surfaceTypes: dto.surfaceTypes?.length
            ? { set: [], connect: idsArrayToArrayObjects(dto.surfaceTypes) }
            : { set: [] },
          types: dto.types?.length ? { set: [], connect: idsArrayToArrayObjects(dto.types) } : { set: [] },
          sorts: dto.sorts?.length ? { set: [], connect: idsArrayToArrayObjects(dto.sorts) } : { set: [] },
          coatingDensity: dto.coatingDensity?.length
            ? { set: [], connect: idsArrayToArrayObjects(dto.coatingDensity) }
            : { set: [] },
          widths: dto.widths?.length ? { set: [], connect: idsArrayToArrayObjects(dto.widths) } : { set: [] },
          photos: dto.photos?.length ? { set: [], connect: idsArrayToArrayObjects(dto.photos) } : { set: [] },
        },
      });

      return this.errorService.success('Продукт успешно обновлен', { product });
    } catch (e) {
      throw this.errorService.internal('Ошибка обновления продукта', e.message);
    }
  }

  async remove(id: number, query: DeletePlywoodQuery) {
    try {
      const plywoodIsExist = await this.getById(id);

      if (!plywoodIsExist) {
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
