import { Injectable } from '@nestjs/common';
import { CreatePlywoodFormatsDto } from 'entities/plywood-formats/dto/create-plywood-formats.dto';
import { PrismaService } from 'database/prisma/prisma.service';
import { ErrorService } from 'common/error/error.service';
import { IPlywoodFormat } from 'entities/plywood-formats/types/IPlywoodFormat.interface';

@Injectable()
export class PlywoodFormatsService {
  constructor(private readonly prismaService: PrismaService, private readonly errorService: ErrorService) {}

  async getAll() {
    try {
      const formats = (await this.prismaService.formatPlywood.findMany()) as any as IPlywoodFormat[];

      const groupedByFormat = {};

      formats.forEach(format => {
        if (groupedByFormat[format.format]) {
          groupedByFormat[format.format].push(format);
        } else {
          groupedByFormat[format.format] = [format];
        }
      })

      return this.errorService.success('Форматы успешно получены', { formats: groupedByFormat });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения форматов', e.message);
    }
  }

  async getById(id: number) {
    try {
      const format = (await this.prismaService.formatPlywood.findFirst({ where: { id } })) as any as IPlywoodFormat;

      return this.errorService.success('Формат успешно получен', { format });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения формата', e.message);
    }
  }

  async add(dto: CreatePlywoodFormatsDto) {
    try {
      const format = (await this.prismaService.formatPlywood.create({ data: dto })) as any as IPlywoodFormat;

      return this.errorService.success('Формат успешно создан', { format });
    } catch (e) {
      throw this.errorService.internal('Ошибка создания формата', e.message);
    }
  }

  async update(id: number, dto) {
    try {
      const format = (await this.prismaService.formatPlywood.update({
        where: { id },
        data: dto,
      })) as any as IPlywoodFormat;

      return this.errorService.success('Формат успешно обновлен', { format });
    } catch (e) {
      throw this.errorService.internal('Ошибка обновления формата', e.message);
    }
  }

  async remove(id: number) {
    try {
      const format = (await this.prismaService.formatPlywood.delete({ where: { id } })) as any as IPlywoodFormat;

      return this.errorService.success('Формат успешно удален', { format });
    } catch (e) {
      throw this.errorService.internal('Ошибка удаления формата', e.message);
    }
  }
}
