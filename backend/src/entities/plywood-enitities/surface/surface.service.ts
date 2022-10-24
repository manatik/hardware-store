import { Injectable } from '@nestjs/common';
import { CreatePlywoodSurfaceDto } from 'entities/plywood-enitities/surface/dto/create-plywood-surface.dto';
import { PrismaService } from 'database/prisma/prisma.service';
import { ErrorService } from 'common/error/error.service';
import { IPlywoodSurface } from 'entities/plywood-enitities/surface/types/IPlywoodSurface.interface';

@Injectable()
export class SurfaceService {
  constructor(private readonly prismaService: PrismaService, private readonly errorService: ErrorService) {}

  async getAll() {
    try {
      const surfaces = (await this.prismaService.plywoodSurfaceType.findMany()) as any as IPlywoodSurface[];

      return this.errorService.success('Типы покрытий успешно получены', { surfaces });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения типов покрытий', e.message);
    }
  }

  async getById(id: number) {
    try {
      const surface = (await this.prismaService.plywoodSurfaceType.findFirst({
        where: { id },
      })) as any as IPlywoodSurface;

      return this.errorService.success('Тип покрытия успешно получен', { surface });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения типа покрытия', e.message);
    }
  }

  async add(dto: CreatePlywoodSurfaceDto) {
    try {
      const surface = (await this.prismaService.plywoodSurfaceType.create({ data: dto })) as any as IPlywoodSurface;

      return this.errorService.success('Тип покрытия успешно создан', { surface });
    } catch (e) {
      throw this.errorService.internal('Ошибка создания типа покрытия', e.message);
    }
  }

  async update(id: number, dto) {
    try {
      const surface = (await this.prismaService.plywoodSurfaceType.update({
        where: { id },
        data: dto,
      })) as any as IPlywoodSurface;

      return this.errorService.success('Тип покрытия успешно обновлен', { surface });
    } catch (e) {
      throw this.errorService.internal('Ошибка создания типа покрытия', e.message);
    }
  }

  async remove(id: number) {
    try {
      const isSurfaceExist = await this.getById(id);

      if (!isSurfaceExist) {
        throw this.errorService.badRequest(`Типа поверхности с id=${id} не существует`);
      }

      const surface = (await this.prismaService.plywoodSurfaceType.delete({ where: { id } })) as any as IPlywoodSurface;

      return this.errorService.success('Тип покрытия успешно удален', { surface });
    } catch (e) {
      throw this.errorService.internal('Ошибка удаления типа покрытия', e.message);
    }
  }
}
