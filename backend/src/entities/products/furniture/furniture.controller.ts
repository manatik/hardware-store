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
  UseInterceptors
} from "@nestjs/common";
import { FurnitureService } from "./furniture.service";
import { CreateFurnitureDto } from "./dto/create-furniture.dto";
import { FilesInterceptor } from "@nestjs/platform-express";

@Controller("products/furniture")
export class FurnitureController {
  constructor(private readonly furnitureService: FurnitureService) {}

  @Get()
  async all() {
    return await this.furnitureService.getAll();
  }

  @Get(":id")
  async byId(@Param('id', ParseIntPipe) id: number) {
    return await this.furnitureService.getById(id);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('photos'))
  async add(@UploadedFiles() photos: Array<Express.Multer.File>, @Body() dto: CreateFurnitureDto) {
    return await this.furnitureService.add(dto, photos);
  }

  @Patch(":id")
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto) {
    return await this.furnitureService.update(id, dto);
  }

  @Delete(":id")
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.furnitureService.remove(id);
  }
}