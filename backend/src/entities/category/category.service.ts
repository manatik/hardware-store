import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../database/prisma/prisma.service";
import { ErrorService } from "../../common/error/error.service";

@Injectable()
export class CategoryService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly errorService: ErrorService
  ) {
  }

  async getAll() {
    try {
      const categories = await this.prismaService.category.findMany();

      return this.errorService.success("Категории успешно получены", { categories });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения категорий', e.message);
    }
  }

  async getById(id: number) {
    try {
      const category = await this.prismaService.category.findUnique({ where: { id } });

      return this.errorService.success("Категория успешно получена", { category });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения категории', e.message);
    }
  }

  async update(id: number, dto) {
    try {
      const category = await this.prismaService.category.update({ where: { id }, data: dto });

      return this.errorService.success("Категория успешно обновлена", { category });
    } catch (e) {
      throw this.errorService.internal('Ошибка обновления категории', e.message);
    }
  }
}