import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma-service/prisma.service';
import { ErrorService } from '@error/error.service';
import { UpdateSortDto } from './dto/update-sort.dto';

@Injectable()
export class SortService {
  constructor(private readonly prismaService: PrismaService, private readonly errorService: ErrorService) {}

  async getAll() {
    try {
      const allItems = await this.prismaService.plywoodSort.findMany();
      return this.errorService.success('Успешно', { data: allItems });
    } catch (e) {
      return this.errorService.internal('Ошибка', e.message);
    }
  }

  async getById(id: string) {
    try {
      const item = await this.prismaService.plywoodSort.findFirst({ where: { id } });
      return this.errorService.success('Успешно', { data: item });
    } catch (e) {
      return this.errorService.internal('Ошибка', e.message);
    }
  }

  async add(dto) {
    try {
      const created = await this.prismaService.plywoodSort.create({ data: dto });
      return this.errorService.success('Успешно', { data: created });
    } catch (e) {
      return this.errorService.internal('Ошибка', e.message);
    }
  }

  async update(id: string, dto: UpdateSortDto) {
    try {
      const updated = await this.prismaService.plywoodSort.update({ where: { id }, data: dto });
      return this.errorService.success('Успешно', { data: updated });
    } catch (e) {
      return this.errorService.internal('Ошибка', e.message);
    }
  }

  async remove(id: string) {
    try {
      const removed = await this.prismaService.plywoodSort.delete({ where: { id } });
      return this.errorService.success('Успешно', { data: removed });
    } catch (e) {
      return this.errorService.internal('Ошибка', e.message);
    }
  }
}
