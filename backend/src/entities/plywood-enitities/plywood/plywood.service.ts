import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma/prisma.service';
import { ErrorService } from 'common/error/error.service';
import { CreatePlywoodDto } from 'entities/plywood-enitities/plywood/dto/create-plywood.dto';
import { IPlywood } from 'entities/plywood-enitities/plywood/types/IPlywood.interface';
import { FilesService } from 'common/files/files.service';
import { DeletePlywoodQuery } from 'entities/plywood-enitities/plywood/dto/delete-plywood.query';
import { Prisma } from '@prisma/client';
import { IPhoto } from 'types/IPhoto.type';
import { AddPhotoDto } from 'entities/plywood-enitities/plywood/dto/add-photo.dto';
import { UpdatePlywoodDto } from './dto/update-plywood.dto';
import { idsArrayToArrayObjects } from '../../../common/utils/utils';

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
        include: {
          formats: true,
          surfaceTypes: true,
          category: true,
          sorts: true,
          coatingDensity: true,
          features: true,
        },
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
        include: {
          formats: true,
          surfaceTypes: true,
          category: true,
          sorts: true,
          coatingDensity: true,
          features: true,
        },
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

      const product = (await this.prismaService.plywood.create({ data: dto })) as any as IPlywood;

      return this.errorService.success('Продукт успешно добавлен', { product });
    } catch (e) {
      throw this.errorService.internal('Ошибка добавления продукта', e.message);
    }
  }

  async addPhotos(id: number, photos: Array<Express.Multer.File>, dto: AddPhotoDto) {
    try {
      const photoPaths: IPhoto[] = [];

      for (const photo of photos) {
        const { path, filename } = await this.filesService.writeFileWithCompress({
          filename: photo.originalname,
          buffer: photo.buffer,
        });

        photoPaths.push({
          filename,
          path,
          color: dto.color,
        });
      }

      await this.prismaService.plywood.update({
        where: { id },
        data: { photos: photoPaths as unknown as Prisma.JsonArray },
      });

      return this.errorService.success('Фото успешно добавлено');
    } catch (e) {
      throw this.errorService.internal('Ошибка добавления фото продукта', e.message);
    }
  }

  async update(id: number, dto: UpdatePlywoodDto) {
    try {
      const updated = await this.prismaService.plywood.update({
        where: { id },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        data: {
          ...dto,
          formats: dto.formats?.length ? { connect: idsArrayToArrayObjects(dto.formats) } : { set: [] },
          surfaceTypes: dto.surfaceTypes?.length ? { connect: idsArrayToArrayObjects(dto.surfaceTypes) } : { set: [] },
          types: dto.types?.length ? { connect: idsArrayToArrayObjects(dto.types) } : { set: [] },
          sorts: dto.sorts?.length ? { connect: idsArrayToArrayObjects(dto.sorts) } : { set: [] },
          coatingDensity: dto.coatingDensity?.length
            ? { connect: idsArrayToArrayObjects(dto.coatingDensity) }
            : { set: [] },
          widths: dto.widths?.length ? { connect: idsArrayToArrayObjects(dto.widths) } : { set: [] },
        },
      });

      return this.errorService.success('Продукт успешно обновлен', { data: updated });
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
      const formats = formatIds.map((id) => ({ id: parseInt(id) }));

      await this.prismaService.plywood.update({
        where: { id: product.id },
        data: {
          formats: { connect: formats },
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async addSurfacesToPlywood(product: IPlywood, surfaceIds: string[] | number[]) {
    try {
      const surfaces = surfaceIds.map((id) => ({ id: parseInt(id) }));

      await this.prismaService.plywood.update({
        where: { id: product.id },
        data: {
          surfaceTypes: { connect: surfaces },
        },
      });
    } catch (e) {
      throw e;
    }
  }
}
