import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma-service/prisma.service';
import { ErrorService } from '@error/error.service';
import { UpdateCoatingDensityDto } from './dto/update-coating-density.dto';

@Injectable()
export class CoatingDensityService {
  constructor(private readonly prismaService: PrismaService, private readonly errorService: ErrorService) {}

  async getAll() {
    try {
      const allItems = await this.prismaService.plywoodCoatingDensity.findMany();
      return this.errorService.success('Успешно', { data: allItems });
    } catch (e) {
      return this.errorService.internal('Ошибка', e.message);
    }
  }

  async getById(id: string) {
    try {
      const item = await this.prismaService.plywoodCoatingDensity.findFirst({ where: { id } });
      return this.errorService.success('Успешно', { data: item });
    } catch (e) {
      return this.errorService.internal('Ошибка', e.message);
    }
  }

  async add(dto) {
    try {
      const created = await this.prismaService.plywoodCoatingDensity.create({ data: dto });
      return this.errorService.success('Успешно', { data: created });
    } catch (e) {
      return this.errorService.internal('Ошибка', e.message);
    }
  }

  async update(id: string, dto: UpdateCoatingDensityDto) {
    try {
      const updated = await this.prismaService.plywoodCoatingDensity.update({ where: { id }, data: dto });
      return this.errorService.success('Успешно', { data: updated });
    } catch (e) {
      return this.errorService.internal('Ошибка', e.message);
    }
  }

  async remove(id: string) {
    try {
      const removed = await this.prismaService.plywoodCoatingDensity.delete({ where: { id } });
      return this.errorService.success('Успешно', { data: removed });
    } catch (e) {
      return this.errorService.internal('Ошибка', e.message);
    }
  }
}
