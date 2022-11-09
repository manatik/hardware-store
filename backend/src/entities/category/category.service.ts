import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma-service/prisma.service';
import { ErrorService } from '@error/error.service';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService, private readonly errorService: ErrorService) {}

  async getAll() {
    try {
      const categories = await this.prismaService.category.findMany();

      return this.errorService.success('Категории успешно получены', {
        categories,
      });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения категорий', e.message);
    }
  }

  async getById(id: string) {
    try {
      const category = await this.prismaService.category.findUnique({
        where: { id },
      });

      return this.errorService.success('Категория успешно получена', {
        category,
      });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения категории', e.message);
    }
  }

  async update(id: string, dto: UpdateCategoryDto) {
    try {
      const category = await this.prismaService.category.update({
        where: { id },
        data: dto,
      });

      return this.errorService.success('Категория успешно обновлена', {
        category,
      });
    } catch (e) {
      throw this.errorService.internal('Ошибка обновления категории', e.message);
    }
  }
}
