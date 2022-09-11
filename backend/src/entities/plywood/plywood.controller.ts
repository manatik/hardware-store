import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PlywoodService } from 'entities/plywood/plywood.service';
import { CreatePlywoodDto } from 'entities/plywood/dto/create-plywood.dto';
import { Public } from 'authorization/decorators/public.decorator';
import { Roles } from 'authorization/decorators/roles.decorator';
import { Role } from 'authorization/enum/role.enum';
import { FilesInterceptor } from '@nestjs/platform-express';
import { DeletePlywoodQuery } from 'entities/plywood/dto/delete-plywood.query';

@Controller('products/plywood')
export class PlywoodController {
  constructor(private readonly plywoodService: PlywoodService) {}

  @Public()
  @Get()
  async all() {
    return await this.plywoodService.getAll();
  }

  @Public()
  @Get(':id')
  async byId(@Param('id', ParseIntPipe) id: number) {
    return await this.plywoodService.getById(id);
  }

  @Roles(Role.Admin)
  @Post()
  async add(@Body() dto: CreatePlywoodDto) {
    return await this.plywoodService.add(dto);
  }

  @Roles(Role.Admin)
  @UseInterceptors(FilesInterceptor('photos'))
  @Post('photos/:id')
  async addPhotos(@UploadedFiles() photos: Array<Express.Multer.File>, @Param('id', ParseIntPipe) id: number) {
    return await this.plywoodService.addPhotos(id, photos);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto) {
    return await this.plywoodService.update(id, dto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Query() query: DeletePlywoodQuery) {
    return await this.plywoodService.remove(id, query);
  }
}
