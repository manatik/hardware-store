import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('products/house')
export class HouseController {
  @Get()
  async all() {
    return Promise.resolve('all products');
  }

  @Get(':id')
  async byId() {
    return Promise.resolve('by id');
  }

  @Post()
  async add() {
    return Promise.resolve('add product');
  }

  @Patch(':id')
  async update() {
    return Promise.resolve('update product');
  }

  @Delete(':id')
  async remove() {
    return Promise.resolve('remove product');
  }
}
