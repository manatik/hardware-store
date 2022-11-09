import { Injectable } from '@nestjs/common';
import { ErrorService } from '@error/error.service';
import { PrismaService } from '@prisma-service/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { arrayOfObjectsToArrayIds, idsArrayToArrayOfObjects } from '@utils/utils';

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
          email: true,
          fio: true,
          phone: true,
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
          email: true,
          fio: true,
          phone: true,
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
      let connectPlywoodIds: { id: string }[] | undefined = undefined;
      let connectFurnitureIds: { id: string }[] | undefined = undefined;

      if (products.plywood?.length) {
        const ids = arrayOfObjectsToArrayIds(products.plywood);

        const plywood = await this.prismaService.plywood.findMany({
          where: { id: { in: ids } },
          select: { id: true, price: true },
        });

        if (products.plywood.length !== plywood.length) {
          throw new Error('Ошибка заказа, имеется недействительный товар фанеры');
        }

        sum += this.calcProductPrice(plywood.map((ply, index) => ({ ...ply, count: products.plywood[index].count })));
        connectPlywoodIds = idsArrayToArrayOfObjects(ids);
      }

      if (products.furniture?.length) {
        const ids = arrayOfObjectsToArrayIds(products.furniture);

        const furniture = await this.prismaService.furniture.findMany({
          where: { id: { in: ids } },
          select: { id: true, price: true },
        });

        if (products.furniture.length !== furniture.length) {
          throw new Error('Ошибка заказа, имеется недействительный товар мебели');
        }

        sum += this.calcProductPrice(
          furniture.map((fur, index) => ({ ...fur, count: products.furniture[index].count })),
        );
        connectFurnitureIds = idsArrayToArrayOfObjects(ids);
      }

      const order = await this.prismaService.order.create({
        data: {
          ...dto,
          plywoods: { connect: connectPlywoodIds },
          furnitures: { connect: connectFurnitureIds },
          price: sum,
        },
        include: {
          furnitures: true,
          houses: true,
          plywoods: true,
        },
      });

      return this.errorService.success('Заказ успешно создан', { data: order });
    } catch (e) {
      return this.errorService.internal('Ошибка создания заказа', e.message);
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

  private calcProductPrice(arr: any[]) {
    return arr.reduce((acc, product) => acc + product.price * product.count, 0);
  }
}
