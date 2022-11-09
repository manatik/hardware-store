import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ENDPOINTS, GLOBAL_PREFIXES } from '@consts/endpoints.consts';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Role } from '@authorization/enum/role.enum';
import { Public, Roles } from '@authorization/decorators';

@Roles(Role.Admin)
@Controller(GLOBAL_PREFIXES.ORDER)
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get(ENDPOINTS.ORDER.GET_ALL)
  async getAll() {
    return await this.orderService.getAll();
  }

  @Get(ENDPOINTS.ORDER.GET_BY_ID)
  async getById(@Param('id') id: string) {
    return await this.orderService.getById(id);
  }

  @Public()
  @Post(ENDPOINTS.ORDER.CREATE)
  async create(@Body() dto: CreateOrderDto) {
    return this.orderService.create(dto);
  }

  @Delete(ENDPOINTS.ORDER.DELETE)
  async delete(@Param('id') id: string) {
    return await this.orderService.delete(id);
  }
}
