import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@prisma-service/prisma.service';
import { ErrorService } from '@error/error.service';
import { AddPhotoDto } from './dto/add-photo.dto';
import { IPhoto } from 'types/IPhoto.type';
import { FilesService } from '@files/files.service';

@Injectable()
export class PhotosService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly errorService: ErrorService,
    private readonly filesService: FilesService,
  ) {}

  async getAll() {
    try {
      const photos = await this.prismaService.plywoodPhotos.findMany();

      return this.errorService.success('Фото успешно получены', { data: photos });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения фото', e.message);
    }
  }

  async getById(id: string) {
    try {
      const photo = await this.prismaService.plywoodPhotos.findFirst({ where: { id } });

      return this.errorService.success('Фото успешно получены', { data: photo });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения фото', e.message);
    }
  }

  async add(photos: Array<Express.Multer.File>, dto: AddPhotoDto) {
    try {
      const photoPaths: IPhoto[] = [];

      const checkUniq = await this.prismaService.plywoodPhotos.findUnique({ where: { name: dto.name } });

      if (checkUniq) {
        throw new Error(`Характеристика Фото с названием - ${dto.name} уже существует`);
      }

      if (!photos.length) {
        throw new Error('Фото не получено');
      }

      for await (const photo of photos) {
        const { path, filename, originalFilename, size } = await this.filesService.writeFileWithCompress({
          filename: photo.originalname,
          buffer: photo.buffer,
          size: photo.size,
        });

        photoPaths.push({ filename, path, originalFilename, size });
      }

      const createdPhotos = await this.prismaService.plywoodPhotos.create({
        data: {
          ...dto,
          photos: photoPaths as any as Prisma.JsonArray,
        },
      });

      return this.errorService.success('Фото успешно созданы', { data: createdPhotos });
    } catch (e) {
      throw this.errorService.internal('Ошибка создания фото', e.message);
    }
  }

  async update(id: string, photos: Array<Express.Multer.File>, dto: AddPhotoDto) {
    try {
      const photoPaths: IPhoto[] = [];

      if (!photos.length) {
        throw new Error('Фото не получено');
      }

      for await (const photo of photos) {
        const { path, filename, originalFilename, size } = await this.filesService.writeFileWithCompress({
          filename: photo.originalname,
          buffer: photo.buffer,
          size: photo.size,
        });

        photoPaths.push({ filename, path, originalFilename, size });
      }

      const photo = await this.prismaService.plywoodPhotos.update({
        where: { id },
        data: {
          ...dto,
          photos: photoPaths as any as Prisma.JsonArray,
        },
      });

      return this.errorService.success('Фото успешно обновлены', { data: photo });
    } catch (e) {
      throw this.errorService.internal('Ошибка обновления фото', e.message);
    }
  }

  async remove(id: string) {
    try {
      const { error, data } = await this.getById(id);

      if (error || !data) {
        throw this.errorService.badRequest(`Фото фанеры с id=${id} не существует`);
      }

      // @ts-ignore
      for await (const photo of data.photos) {
        await this.filesService.removeFile(photo.filename);
      }

      const photos = await this.prismaService.plywoodPhotos.delete({ where: { id } });

      return this.errorService.success('Фото успешно удалены', { data: photos });
    } catch (e) {
      throw this.errorService.internal('Ошибка удаления фото', e.message);
    }
  }
}
