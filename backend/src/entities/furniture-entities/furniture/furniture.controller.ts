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
import { ENDPOINTS, GLOBAL_PREFIXES } from 'common/consts/endpoints.consts';
import { Public, Roles } from 'authorization/decorators';
import { Role } from 'authorization/enum/role.enum';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AddPhotoDto } from './dto/add-photo.dto';
import { UpdateFurnitureDto } from './dto/update-furniture.dto';

@Roles(Role.Admin)
@Controller(GLOBAL_PREFIXES.FURNITURE)
export class FurnitureController {
  constructor(private readonly furnitureService: FurnitureService) {}

  @Public()
  @Get(ENDPOINTS.FURNITURE.GET_ALL)
  async all() {
    return await this.furnitureService.getAll();
  }

  @Public()
  @Get(ENDPOINTS.FURNITURE.GET_BY_ID)
  async byId(@Param('id', ParseIntPipe) id: number) {
    return await this.furnitureService.getById(id);
  }

  @Post(ENDPOINTS.FURNITURE.CREATE)
  async add(@Body() dto: CreateFurnitureDto) {
    return await this.furnitureService.add(dto);
  }

  @UseInterceptors(FilesInterceptor('photos'))
  @Post(ENDPOINTS.PLYWOOD.ADD_PHOTOS)
  async addPhotos(
    @UploadedFiles() photos: Array<Express.Multer.File>,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AddPhotoDto,
  ) {
    return await this.furnitureService.addPhotos(id, photos, dto);
  }

  @Patch(ENDPOINTS.FURNITURE.UPDATE)
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateFurnitureDto) {
    return await this.furnitureService.update(id, dto);
  }

  @Delete(ENDPOINTS.FURNITURE.DELETE)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.furnitureService.remove(id);
  }
}
