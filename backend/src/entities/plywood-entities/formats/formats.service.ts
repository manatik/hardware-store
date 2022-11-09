import { Injectable } from '@nestjs/common';
import { CreatePlywoodFormatsDto } from './dto/create-plywood-formats.dto';
import { PrismaService } from '@prisma-service/prisma.service';
import { ErrorService } from '@error/error.service';
import { UpdateFormatsDto } from './dto/update-formats.dto';

@Injectable()
export class FormatsService {
  constructor(private readonly prismaService: PrismaService, private readonly errorService: ErrorService) {}

  async getAll() {
    try {
      const formats = await this.prismaService.plywoodFormat.findMany();

      return this.errorService.success('Форматы успешно получены', { data: formats });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения форматов', e.message);
    }
  }

  async getById(id: string) {
    try {
      const format = await this.prismaService.plywoodFormat.findFirst({ where: { id } });

      return this.errorService.success('Формат успешно получен', { data: format });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения формата', e.message);
    }
  }

  async add(dto: CreatePlywoodFormatsDto) {
    try {
      const format = await this.prismaService.plywoodFormat.create({ data: dto });

      return this.errorService.success('Формат успешно создан', { data: format });
    } catch (e) {
      throw this.errorService.internal('Ошибка создания формата', e.message);
    }
  }

  async update(id: string, dto: UpdateFormatsDto) {
    try {
      const format = await this.prismaService.plywoodFormat.update({
        where: { id },
        data: dto,
      });

      return this.errorService.success('Формат успешно обновлен', { data: format });
    } catch (e) {
      throw this.errorService.internal('Ошибка обновления формата', e.message);
    }
  }

  async remove(id: string) {
    try {
      const isFormatExist = await this.getById(id);

      if (!isFormatExist) {
        throw this.errorService.badRequest(`Формата фанеры с id=${id} не существует`);
      }

      const format = await this.prismaService.plywoodFormat.delete({ where: { id } });

      return this.errorService.success('Формат успешно удален', { data: format });
    } catch (e) {
      throw this.errorService.internal('Ошибка удаления формата', e.message);
    }
  }
}
