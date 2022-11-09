import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma-service/prisma.service';
import { ErrorService } from '@error/error.service';
import { UpdateWidthDto } from './dto/update-width.dto';
import { CreateWidthDto } from './dto/create-width.dto';

@Injectable()
export class WidthService {
  constructor(private readonly prismaService: PrismaService, private readonly errorService: ErrorService) {}

  async getAll() {
    try {
      const allItems = await this.prismaService.plywoodWidth.findMany();
      return this.errorService.success('Успешно', { data: allItems });
    } catch (e) {
      return this.errorService.internal('Ошибка', e.message);
    }
  }

  async getById(id: string) {
    try {
      const item = await this.prismaService.plywoodWidth.findFirst({ where: { id } });
      return this.errorService.success('Успешно', { data: item });
    } catch (e) {
      return this.errorService.internal('Ошибка', e.message);
    }
  }

  async add(dto: CreateWidthDto) {
    try {
      const created = await this.prismaService.plywoodWidth.create({ data: dto });
      return this.errorService.success('Успешно', { data: created });
    } catch (e) {
      return this.errorService.internal('Ошибка', e.message);
    }
  }

  async update(id: string, dto: UpdateWidthDto) {
    try {
      const updated = await this.prismaService.plywoodWidth.update({ where: { id }, data: dto });

      return this.errorService.success('Успешно', { data: updated });
    } catch (e) {
      return this.errorService.internal('Ошибка', e.message);
    }
  }

  async remove(id: string) {
    try {
      const removed = await this.prismaService.plywoodWidth.delete({ where: { id } });
      return this.errorService.success('Успешно', { data: removed });
    } catch (e) {
      return this.errorService.internal('Ошибка', e.message);
    }
  }
}
