import { Injectable } from '@nestjs/common';
import { CreatePlywoodFormatsDto } from 'entities/plywood-enitities/formats/dto/create-plywood-formats.dto';
import { PrismaService } from 'database/prisma/prisma.service';
import { ErrorService } from 'common/error/error.service';
import { IPlywoodFormat } from 'entities/plywood-enitities/formats/types/IPlywoodFormat.interface';
import * as _ from 'radash';
import { isTrue } from 'common/utils/utils';
import { PlywoodFormatsAllQuery } from 'entities/plywood-enitities/formats/dto/plywood-formats-all.query';
import { UpdateFormatsDto } from './dto/update-formats.dto';

@Injectable()
export class FormatsService {
  constructor(private readonly prismaService: PrismaService, private readonly errorService: ErrorService) {}

  async getAll(query: PlywoodFormatsAllQuery) {
    try {
      const formats = (await this.prismaService.plywoodFormat.findMany()) as any as IPlywoodFormat[];

      if (isTrue(query.group)) {
        const groupedByFormat = _.group(formats, (format) => format.format);

        return this.errorService.success('Форматы успешно получены', { formats: groupedByFormat });
      }

      return this.errorService.success('Форматы успешно получены', { formats });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения форматов', e.message);
    }
  }

  async getById(id: number) {
    try {
      const format = (await this.prismaService.plywoodFormat.findFirst({ where: { id } })) as any as IPlywoodFormat;

      return this.errorService.success('Формат успешно получен', { format });
    } catch (e) {
      throw this.errorService.internal('Ошибка получения формата', e.message);
    }
  }

  async add(dto: CreatePlywoodFormatsDto) {
    try {
      const format = (await this.prismaService.plywoodFormat.create({ data: dto })) as any as IPlywoodFormat;

      return this.errorService.success('Формат успешно создан', { format });
    } catch (e) {
      throw this.errorService.internal('Ошибка создания формата', e.message);
    }
  }

  async update(id: number, dto: UpdateFormatsDto) {
    try {
      const format = (await this.prismaService.plywoodFormat.update({
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
      const isFormatExist = await this.getById(id);

      if (!isFormatExist) {
        throw this.errorService.badRequest(`Формата фанеры с id=${id} не существует`);
      }

      const format = (await this.prismaService.plywoodFormat.delete({ where: { id } })) as any as IPlywoodFormat;

      return this.errorService.success('Формат успешно удален', { format });
    } catch (e) {
      throw this.errorService.internal('Ошибка удаления формата', e.message);
    }
  }
}
