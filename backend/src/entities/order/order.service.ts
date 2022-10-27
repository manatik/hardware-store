import { Injectable } from '@nestjs/common';
import { ErrorService } from 'common/error/error.service';
import { PrismaService } from 'database/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

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

  async getById(id: string) {
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

  async create({ products, ...dto }: CreateOrderDto) {
    try {
      let sum = 0;

      if (products.plywood?.length) {
        const plywoods = await this.prismaService.plywood.findMany({
          where: { id: { in: products.plywood.map((ply) => ply.id) } },
          select: { id: true, price: true },
        });

        if (products.plywood.length !== plywoods.length) {
          throw new Error('Ошибка заказа, имеется недействительный товар фанеры');
        }

        sum = products.plywood.reduce((acc, plywood) => acc + plywood.price * plywood.count, 0);
      }

      if (products.furniture?.length) {
        const furnitures = await this.prismaService.furniture.findMany({
          where: { id: { in: products.furniture.map((fur) => fur.id) } },
          select: { id: true, price: true },
        });

        if (products.furniture.length !== furnitures.length) {
          throw new Error('Ошибка заказа, имеется недействительный товар мебели');
        }

        sum = products.furniture.reduce((acc, furniture) => acc + (furniture.price || 0) * furniture.count, 0);
      }

      if (products.house?.length) {
        const houses = await this.prismaService.house.findMany({
          where: { id: { in: products.house.map((house) => house.id) } },
          select: { id: true, price: true },
        });

        sum = houses.reduce((acc, house) => acc + house.price, 0);
      }

      const order = await this.prismaService.order.create({
        data: {
          ...dto,
          plywoods: { connect: products.plywood.map((ply) => ({ id: ply.id })) },
          furnitures: { connect: products.furniture.map((fur) => ({ id: fur.id })) },
          houses: { connect: products.house.map((house) => ({ id: house.id })) },
          price: sum,
        },
      });

      return this.errorService.success('Заказ успешно создан', { data: order });
    } catch (e) {
      this.errorService.internal('Ошибка создания заказа', e.message);
    }
  }

  async delete(id: string) {
    try {
      const order = await this.prismaService.order.delete({ where: { id } });

      return this.errorService.success('Заказ успешно удален', { data: order });
    } catch (e) {
      return this.errorService.internal('Ошибка удаления заказа', e.message);
    }
  }
}
