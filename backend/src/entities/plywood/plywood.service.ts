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
      const duplicate = await this.prismaService.plywood.findFirst({ where: { article: dto.article } });

      if (duplicate) {
        throw this.errorService.badRequest(`Продукт с артикулом - ${dto.article} уже существует`);
      }

      let formatIds: string[] | undefined = undefined;
      let surfaceIds: string[] | undefined = undefined;

      if (dto.formatIds?.length) {
        formatIds = JSON.parse(JSON.stringify(dto.formatIds));
        delete dto.formatIds;
      }

      if (dto.surfaceIds?.length) {
        surfaceIds = JSON.parse(JSON.stringify(dto.surfaceIds));
        delete dto.surfaceIds;
      }

      const product = (await this.prismaService.plywood.create({ data: dto })) as any as IPlywood;

      if (formatIds?.length) {
        console.log('formats', formatIds);
        await this.addFormatsToPlywood(product, formatIds);
      }

      if (surfaceIds?.length) {
        console.log('surface', surfaceIds);
        await this.addSurfacesToPlywood(product, surfaceIds);
      }

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

  async addFormatsToPlywood(product: IPlywood, formatIds: string[] | number[]) {
    try {
      const formats = formatIds.map((id) => ({ formatPlywoodId: parseInt(id) }));

      await this.prismaService.plywood.update({
        where: { id: product.id },
        data: {
          formats: {
            createMany: {
              data: formats,
              skipDuplicates: true,
            },
          },
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async addSurfacesToPlywood(product: IPlywood, surfaceIds: string[] | number[]) {
    try {
      const surfaces = surfaceIds.map((id) => ({ surfaceTypePlywoodId: parseInt(id) }));

      await this.prismaService.plywood.update({
        where: { id: product.id },
        data: {
          surfaceTypes: {
            createMany: {
              data: surfaces,
              skipDuplicates: true,
            },
          },
        },
      });
    } catch (e) {
      throw e;
    }
  }
}
