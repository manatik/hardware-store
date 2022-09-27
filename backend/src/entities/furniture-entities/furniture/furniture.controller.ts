import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FurnitureService } from 'entities/furniture-entities/furniture/furniture.service';
import { CreateFurnitureDto } from 'entities/furniture-entities/furniture/dto/create-furniture.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ENDPOINTS, GLOBAL_PREFIXES } from 'common/consts/endpoints.consts';

@Controller(GLOBAL_PREFIXES.FURNITURE)
export class FurnitureController {
  constructor(private readonly furnitureService: FurnitureService) {}

  @Get()
  async all() {
    return await this.furnitureService.getAll();
  }

  @Get(ENDPOINTS.FURNITURE.GET_BY_ID)
  async byId(@Param('id', ParseIntPipe) id: number) {
    return await this.furnitureService.getById(id);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('photos'))
  async add(@UploadedFiles() photos: Array<Express.Multer.File>, @Body() dto: CreateFurnitureDto) {
    return await this.furnitureService.add(dto, photos);
  }

  @Patch(ENDPOINTS.FURNITURE.UPDATE)
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto) {
    return await this.furnitureService.update(id, dto);
  }

  @Delete(ENDPOINTS.FURNITURE.DELETE)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.furnitureService.remove(id);
  }
}
