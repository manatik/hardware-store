import { Injectable } from '@nestjs/common';
import { CreatePlywoodSurfaceDto } from './dto/create-plywood-surface.dto';
import { PrismaService } from '@prisma-service/prisma.service';
import { ErrorService } from '@error/error.service';

@Injectable()
export class SurfaceService {
  constructor(private readonly prismaService: PrismaService, private readonly errorService: ErrorService) {}

  async getAll() {
    try {
      const surfaces = await this.prismaService.plywoodSurfaceType.findMany();

      return this.errorService.success('Типы покрытий успешно получены', { surfaces });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения типов покрытий', e.message);
    }
  }

  async getById(id: string) {
    try {
      const surface = await this.prismaService.plywoodSurfaceType.findFirst({
        where: { id },
      });

      return this.errorService.success('Тип покрытия успешно получен', { surface });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения типа покрытия', e.message);
    }
  }

  async add(dto: CreatePlywoodSurfaceDto) {
    try {
      const surface = await this.prismaService.plywoodSurfaceType.create({ data: dto });

      return this.errorService.success('Тип покрытия успешно создан', { surface });
    } catch (e) {
      throw this.errorService.internal('Ошибка создания типа покрытия', e.message);
    }
  }

  async update(id: string, dto) {
    try {
      const duplicate = await this.prismaService.plywoodSurfaceType.findFirst({
        where: { name: dto.name, id: { not: id } },
      });

      if (duplicate) {
        throw new Error(`Тип покрытия с названием - ${dto.name} уже существует`);
      }

      const surface = await this.prismaService.plywoodSurfaceType.update({
        where: { id },
        data: dto,
      });

      return this.errorService.success('Тип покрытия успешно обновлен', { surface });
    } catch (e) {
      throw this.errorService.internal('Ошибка создания типа покрытия', e.message);
    }
  }

  async remove(id: string) {
    try {
      const isSurfaceExist = await this.getById(id);

      if (!isSurfaceExist) {
        throw this.errorService.badRequest(`Типа поверхности с id=${id} не существует`);
      }

      const surface = await this.prismaService.plywoodSurfaceType.delete({ where: { id } });

      return this.errorService.success('Тип покрытия успешно удален', { surface });
    } catch (e) {
      throw this.errorService.internal('Ошибка удаления типа покрытия', e.message);
    }
  }
}
