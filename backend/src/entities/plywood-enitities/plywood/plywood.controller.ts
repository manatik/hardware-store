import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PlywoodService } from 'entities/plywood-enitities/plywood/plywood.service';
import { CreatePlywoodDto } from 'entities/plywood-enitities/plywood/dto/create-plywood.dto';
import { Public } from 'authorization/decorators/public.decorator';
import { Roles } from 'authorization/decorators/roles.decorator';
import { Role } from 'authorization/enum/role.enum';
import { FilesInterceptor } from '@nestjs/platform-express';
import { DeletePlywoodQuery } from 'entities/plywood-enitities/plywood/dto/delete-plywood.query';
import { AddPhotoDto } from 'entities/plywood-enitities/plywood/dto/add-photo.dto';
import { ENDPOINTS, GLOBAL_PREFIXES } from 'common/consts/endpoints.consts';
import { UpdatePlywoodDto } from './dto/update-plywood.dto';

@Roles(Role.Admin)
@Controller(GLOBAL_PREFIXES.PLYWOOD)
export class PlywoodController {
  constructor(private readonly plywoodService: PlywoodService) {}

  @Public()
  @Get(ENDPOINTS.PLYWOOD.GET_ALL)
  async all() {
    return await this.plywoodService.getAll();
  }

  @Public()
  @Get(ENDPOINTS.PLYWOOD.GET_BY_ID)
  async byId(@Param('id', ParseIntPipe) id: number) {
    return await this.plywoodService.getById(id);
  }

  @Post(ENDPOINTS.PLYWOOD.CREATE)
  async add(@Body() dto: CreatePlywoodDto) {
    return await this.plywoodService.add(dto);
  }

  @UseInterceptors(FilesInterceptor('photos'))
  @Post(ENDPOINTS.PLYWOOD.ADD_PHOTOS)
  async addPhotos(
    @UploadedFiles() photos: Array<Express.Multer.File>,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AddPhotoDto,
  ) {
    return await this.plywoodService.addPhotos(id, photos, dto);
  }

  @Patch(ENDPOINTS.PLYWOOD.UPDATE)
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePlywoodDto) {
    return await this.plywoodService.update(id, dto);
  }

  @Delete(ENDPOINTS.PLYWOOD.DELETE)
  async remove(@Param('id', ParseIntPipe) id: number, @Query() query: DeletePlywoodQuery) {
    return await this.plywoodService.remove(id, query);
  }
}
