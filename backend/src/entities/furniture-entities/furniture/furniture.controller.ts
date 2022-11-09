import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { FurnitureService } from '@furniture/furniture/furniture.service';
import { CreateFurnitureDto } from '@furniture/furniture/dto/create-furniture.dto';
import { ENDPOINTS, GLOBAL_PREFIXES } from '@consts/endpoints.consts';
import { Public, Roles } from '@authorization/decorators';
import { Role } from '@authorization/enum/role.enum';
import { UpdateFurnitureDto } from './dto/update-furniture.dto';
import { FurnitureAllQuery } from './dto/furniture-all.query';
import { DeleteFurnitureQuery } from './dto/delete-furniture.query';

@Roles(Role.Admin)
@Controller(GLOBAL_PREFIXES.FURNITURE)
export class FurnitureController {
  constructor(private readonly furnitureService: FurnitureService) {}

  @Public()
  @Get(ENDPOINTS.FURNITURE.GET_ALL)
  async all(@Query() query: FurnitureAllQuery) {
    return await this.furnitureService.getAll(query);
  }

  @Public()
  @Get(ENDPOINTS.FURNITURE.GET_BY_ID)
  async byId(@Param('id') id: string) {
    return await this.furnitureService.getById(id);
  }

  @Post(ENDPOINTS.FURNITURE.CREATE)
  async add(@Body() dto: CreateFurnitureDto) {
    return await this.furnitureService.add(dto);
  }

  @Patch(ENDPOINTS.FURNITURE.UPDATE)
  async update(@Param('id') id: string, @Body() dto: UpdateFurnitureDto) {
    return await this.furnitureService.update(id, dto);
  }

  @Delete(ENDPOINTS.FURNITURE.DELETE)
  async remove(@Param('id') id: string, @Query() query: DeleteFurnitureQuery) {
    return await this.furnitureService.remove(id, query);
  }
}
