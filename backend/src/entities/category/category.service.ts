import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma/prisma.service';
import { ErrorService } from 'common/error/error.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ICategory } from 'entities/category/types/ICategory.interface';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService, private readonly errorService: ErrorService) {}

  async getAll() {
    try {
      const categories = (await this.prismaService.category.findMany()) as any as ICategory[];

      return this.errorService.success('Категории успешно получены', {
        categories,
      });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения категорий', e.message);
    }
  }

  async getById(id: number) {
    try {
      const category = (await this.prismaService.category.findUnique({
        where: { id },
      })) as any as ICategory;

      return this.errorService.success('Категория успешно получена', {
        category,
      });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения категории', e.message);
    }
  }

  async update(id: number, dto: UpdateCategoryDto) {
    try {
      const category = (await this.prismaService.category.update({
        where: { id },
        data: dto,
      })) as any as ICategory;

      return this.errorService.success('Категория успешно обновлена', {
        category,
      });
    } catch (e) {
      throw this.errorService.internal('Ошибка обновления категории', e.message);
    }
  }
}
