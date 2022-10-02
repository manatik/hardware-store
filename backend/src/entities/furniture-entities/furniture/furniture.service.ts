import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma/prisma.service';
import { ErrorService } from 'common/error/error.service';
import { CreateFurnitureDto } from 'entities/furniture-entities/furniture/dto/create-furniture.dto';
import { FilesService } from 'common/files/files.service';
import { AddPhotoDto } from './dto/add-photo.dto';
import { IPhoto } from '../../../types/IPhoto.type';
import { Prisma } from '@prisma/client';

@Injectable()
export class FurnitureService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly errorService: ErrorService,
    private readonly filesService: FilesService,
  ) {}

  async getAll() {
    try {
      const products = await this.prismaService.furniture.findMany({
        where: { deleted: { in: null } },
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
        throw this.errorService.badRequest(`Продукт с артикулом - ${dto.article} уже существует`);
      }

      const product = await this.prismaService.furniture.create({ data: dto });

      return this.errorService.success('Продукт успешно добавлен', { product });
    } catch (e) {
      return this.errorService.internal('Ошибка добавления продукта', e.message);
    }
  }

  async update(id: number, dto) {
    try {
      const product = await this.prismaService.furniture.update({
        where: { id },
        data: dto,
      });

      return this.errorService.success('Продукт успешно обновлен', { product });
    } catch (e) {
      throw this.errorService.internal('Ошибка обновления продукта', e.message);
    }
  }

  async remove(id: number) {
    try {
      const product = await this.prismaService.furniture.update({
        where: { id },
        data: { deleted: new Date() },
      });

      return this.errorService.success('Продукт успешно удален', { product });
    } catch (e) {
      throw this.errorService.internal('Ошибка удаления продута', e.message);
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

      this.prismaService.furniture.update({
        where: { id },
        data: { photos: photoPaths as unknown as Prisma.JsonArray },
      });
    } catch (e) {
      throw this.errorService.internal('Ошибка добавления фото продукта', e.message);
    }
  }
}
