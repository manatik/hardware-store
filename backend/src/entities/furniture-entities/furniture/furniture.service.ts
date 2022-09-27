import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma/prisma.service';
import { ErrorService } from 'common/error/error.service';
import { CreateFurnitureDto } from 'entities/furniture-entity/furniture/dto/create-furniture.dto';
import { FilesService } from 'common/files/files.service';

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

  async add(dto: CreateFurnitureDto, photos: Array<Express.Multer.File>) {
    try {
      for (const photo of photos) {
        await this.filesService.writeFileWithCompress({
          filename: photo.originalname,
          buffer: photo.buffer,
        });
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
}
