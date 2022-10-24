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
import { Public } from 'authorization/decorators/public.decorator';
import { ENDPOINTS, GLOBAL_PREFIXES } from 'common/consts/endpoints.consts';
import { Roles } from 'authorization/decorators/roles.decorator';
import { Role } from 'authorization/enum/role.enum';
import { PhotosService } from './photos.service';
import { AddPhotoDto } from '../plywood/dto/add-photo.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller(GLOBAL_PREFIXES.PLYWOOD_PHOTOS)
export class PhotosController {
  constructor(private photosService: PhotosService) {}

  @Public()
  @Get(ENDPOINTS.PLYWOOD_PHOTOS.GET_ALL)
  async all() {
    return await this.photosService.getAll();
  }

  @Public()
  @Get(ENDPOINTS.PLYWOOD_PHOTOS.GET_BY_ID)
  async byId(@Param('id', ParseIntPipe) id: number) {
    return await this.photosService.getById(id);
  }

  // @Roles(Role.Admin)
  @Public()
  @UseInterceptors(FilesInterceptor('photos'))
  @Post(ENDPOINTS.PLYWOOD_PHOTOS.CREATE)
  async add(@UploadedFiles() photos: Array<Express.Multer.File>, @Body() dto: AddPhotoDto) {
    return await this.photosService.add(photos, dto);
  }

  @Roles(Role.Admin)
  @UseInterceptors(FilesInterceptor('photos'))
  @Patch(ENDPOINTS.PLYWOOD_PHOTOS.UPDATE)
  async update(
    @UploadedFiles() photos: Array<Express.Multer.File>,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AddPhotoDto,
  ) {
    return await this.photosService.update(id, photos, dto);
  }

  // @Roles(Role.Admin)
  @Public()
  @Delete(ENDPOINTS.PLYWOOD_PHOTOS.DELETE)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.photosService.remove(id);
  }
}
