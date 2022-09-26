import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma/prisma.service';
import { ErrorService } from 'common/error/error.service';
import { CreatePlywoodDto } from 'entities/plywood/dto/create-plywood.dto';
import { IPlywood } from 'entities/plywood/types/IPlywood.interface';
import { plainToClass } from 'class-transformer';
import { FilesService } from 'common/files/files.service';
import { DeletePlywoodQuery } from 'entities/plywood/dto/delete-plywood.query';

@Injectable()
export class PlywoodService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly errorService: ErrorService,
    private readonly filesService: FilesService,
  ) {}

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

  async addPhotos(id: number, photos: Array<Express.Multer.File>) {
    try {
      const photoPaths: string[] = [];

      for (const photo of photos) {
        const { path } = await this.filesService.writeFileWithCompress({
          filename: photo.originalname,
          buffer: photo.buffer,
        });

        photoPaths.push(path);
      }

      this.prismaService.plywood.update({ where: { id }, data: { photos: photoPaths } });
    } catch (e) {
      throw this.errorService.internal('Ошибка добавления фото продукта', e.message);
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
        product = (await this.prismaService.plywood.update({
          where: { id },
          data: { deleted: new Date() },
        })) as any as IPlywood;
      }

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
