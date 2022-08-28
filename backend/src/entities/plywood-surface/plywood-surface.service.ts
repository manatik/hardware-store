import { Injectable } from '@nestjs/common';
import { CreatePlywoodSurfaceDto } from 'entities/plywood-surface/dto/create-plywood-surface.dto';
import { PrismaService } from 'database/prisma/prisma.service';
import { ErrorService } from 'common/error/error.service';
import { IPlywoodSurface } from 'entities/plywood-surface/types/IPlywoodSurface.interface';

@Injectable()
export class PlywoodSurfaceService {
  constructor(private readonly prismaService: PrismaService, private readonly errorService: ErrorService) {}

  async getAll() {
    try {
      const surfaces = (await this.prismaService.surfaceTypePlywood.findMany()) as any as IPlywoodSurface[];

      return this.errorService.success('Типы покрытий успешно получены', { surfaces });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения типов покрытий', e.message);
    }
  }

  async getById(id: number) {
    try {
      const surface = (await this.prismaService.surfaceTypePlywood.findFirst({
        where: { id },
      })) as any as IPlywoodSurface;

      return this.errorService.success('Тип покрытия успешно получен', { surface });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения типа покрытия', e.message);
    }
  }

  async add(dto: CreatePlywoodSurfaceDto) {
    try {
      const surface = (await this.prismaService.surfaceTypePlywood.create({ data: dto })) as any as IPlywoodSurface;

      return this.errorService.success('Тип покрытия успешно создан', { surface });
    } catch (e) {
      throw this.errorService.internal('Ошибка создания типа покрытия', e.message);
    }
  }

  async update(id: number, dto: Partial<CreatePlywoodSurfaceDto>) {
    try {
      const surface = (await this.prismaService.surfaceTypePlywood.update({
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
      const surface = (await this.prismaService.surfaceTypePlywood.delete({ where: { id } })) as any as IPlywoodSurface;

      return this.errorService.success('Тип покрытия успешно удален', { surface });
    } catch (e) {
      throw this.errorService.internal('Ошибка удаления типа покрытия', e.message);
    }
  }
}
