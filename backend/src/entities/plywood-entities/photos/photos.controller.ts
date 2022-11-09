import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Public, Roles } from '@authorization/decorators';
import { ENDPOINTS, GLOBAL_PREFIXES } from '@consts/endpoints.consts';
import { Role } from '@authorization/enum/role.enum';
import { PhotosService } from './photos.service';
import { AddPhotoDto } from './dto/add-photo.dto';

@Roles(Role.Admin)
@Controller(GLOBAL_PREFIXES.PLYWOOD_PHOTOS)
export class PhotosController {
  constructor(private photosService: PhotosService) {}

  @Public()
  @Get(ENDPOINTS.PLYWOOD_CHARACTERS.GET_ALL)
  async all() {
    return await this.photosService.getAll();
  }

  @Public()
  @Get(ENDPOINTS.PLYWOOD_CHARACTERS.GET_BY_ID)
  async byId(@Param('id') id: string) {
    return await this.photosService.getById(id);
  }

  @UseInterceptors(FilesInterceptor('photos'))
  @Post(ENDPOINTS.PLYWOOD_CHARACTERS.CREATE)
  async add(@UploadedFiles() photos: Array<Express.Multer.File>, @Body() dto: AddPhotoDto) {
    return await this.photosService.add(photos, dto);
  }

  @UseInterceptors(FilesInterceptor('photos'))
  @Patch(ENDPOINTS.PLYWOOD_CHARACTERS.UPDATE)
  async update(@UploadedFiles() photos: Array<Express.Multer.File>, @Param('id') id: string, @Body() dto: AddPhotoDto) {
    return await this.photosService.update(id, photos, dto);
  }

  @Delete(ENDPOINTS.PLYWOOD_CHARACTERS.DELETE)
  async remove(@Param('id') id: string) {
    return await this.photosService.remove(id);
  }
}
