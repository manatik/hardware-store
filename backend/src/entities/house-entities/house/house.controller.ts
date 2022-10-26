import { Controller, Delete, Get, Param, Patch, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

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

  @Post('photos/:id')
  @UseInterceptors(FilesInterceptor('photos'))
  async addPhotos(@UploadedFiles() photos: Array<Express.Multer.File>, @Param('id') id: string) {
    return Promise.resolve('add photos');
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
