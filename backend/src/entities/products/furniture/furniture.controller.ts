import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { FurnitureService } from "./furniture.service";
import { Public } from "../../../authorization/decorators/public.decorator";

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
  async add(@Body() dto) {
    return await this.furnitureService.add(dto);
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