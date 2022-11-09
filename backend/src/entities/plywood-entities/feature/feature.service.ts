import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma-service/prisma.service';
import { ErrorService } from '@error/error.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';

@Injectable()
export class FeatureService {
  constructor(private readonly prismaService: PrismaService, private readonly errorService: ErrorService) {}

  async getAll() {
    try {
      const allItems = await this.prismaService.plywoodFeature.findMany();

      return this.errorService.success('Успешно', { data: allItems });
    } catch (e) {
      return this.errorService.internal('Ошибка', e.message);
    }
  }

  async getById(id: string) {
    try {
      const item = await this.prismaService.plywoodFeature.findFirst({ where: { id } });

      return this.errorService.success('Успешно', { data: item });
    } catch (e) {
      return this.errorService.internal('Ошибка', e.message);
    }
  }

  async add(dto: CreateFeatureDto) {
    try {
      const created = await this.prismaService.plywoodFeature.create({ data: dto });

      return this.errorService.success('Успешно', { data: created });
    } catch (e) {
      return this.errorService.internal('Ошибка', e.message);
    }
  }

  async update(id: string, dto: UpdateFeatureDto) {
    try {
      const duplicate = await this.prismaService.plywoodFeature.findFirst({
        where: { name: dto.name, id: { not: id } },
      });

      if (duplicate) {
        throw new Error(`Характеристика с названием - ${dto.name} уже существует`);
      }

      const updated = await this.prismaService.plywoodFeature.update({ where: { id }, data: dto });

      return this.errorService.success('Успешно', { data: updated });
    } catch (e) {
      return this.errorService.internal('Ошибка', e.message);
    }
  }

  async remove(id: string) {
    try {
      const removed = await this.prismaService.plywoodFeature.delete({ where: { id } });

      return this.errorService.success('Успешно', { data: removed });
    } catch (e) {
      return this.errorService.internal('Ошибка', e.message);
    }
  }
}
