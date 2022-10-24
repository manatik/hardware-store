import { Injectable } from '@nestjs/common';
import { ErrorService } from 'common/error/error.service';
import { PrismaService } from 'database/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { idsArrayToArrayObjects } from 'common/utils/utils';

@Injectable()
export class OrderService {
  constructor(private errorService: ErrorService, private prismaService: PrismaService) {}

  async getAll() {
    try {
      const orders = await this.prismaService.order.findMany({
        select: {
          id: true,
          price: true,
          plywoods: true,
          houses: true,
          furnitures: true,
          updatedAt: true,
          createdAt: true,
        },
      });

      return this.errorService.success('Заказы успешно получены', { data: orders });
    } catch (e) {
      this.errorService.internal('Ошибка получения заказов', e.message);
    }
  }

  async getById(id: number) {
    try {
      const order = await this.prismaService.order.findFirst({
        where: { id },
        select: {
          id: true,
          price: true,
          plywoods: true,
          houses: true,
          furnitures: true,
          updatedAt: true,
          createdAt: true,
        },
      });

      return this.errorService.success('Заказ успешно получен', { data: order });
    } catch (e) {
      this.errorService.internal('Ошибка получения заказа', e.message);
    }
  }

  async create(dto: CreateOrderDto) {
    try {
      let sum = 0;

      if (dto.plywoods) {
        const plywoods = await this.prismaService.plywood.findMany({
          where: { id: { in: dto.plywoods } },
          select: { id: true, price: true },
        });

        sum = plywoods.reduce((acc, plywood) => acc + plywood.price, 0);
      }

      if (dto.houses) {
        const houses = await this.prismaService.house.findMany({
          where: { id: { in: dto.houses } },
          select: { id: true, price: true },
        });

        sum = houses.reduce((acc, house) => acc + house.price, 0);
      }

      if (dto.furnitures) {
        const furnitures = await this.prismaService.furniture.findMany({
          where: { id: { in: dto.plywoods } },
          select: { id: true, price: true },
        });

        sum = furnitures.reduce((acc, furniture) => acc + furniture.price, 0);
      }

      const order = await this.prismaService.order.create({
        data: {
          ...dto,
          plywoods: { connect: idsArrayToArrayObjects(dto.plywoods) },
          furnitures: { connect: idsArrayToArrayObjects(dto.furnitures) },
          houses: { connect: idsArrayToArrayObjects(dto.houses) },
          price: sum,
        },
      });

      return this.errorService.success('Заказ успешно создан', { data: order });
    } catch (e) {
      this.errorService.internal('Ошибка создания заказа', e.message);
    }
  }

  async delete(id: number) {
    try {
      const order = await this.prismaService.order.delete({ where: { id } });

      return this.errorService.success('Заказ успешно удален', { data: order });
    } catch (e) {
      return this.errorService.internal('Ошибка удаления заказа', e.message);
    }
  }
}
