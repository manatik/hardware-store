import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { Public } from 'authorization/decorators/public.decorator';
import { Roles } from 'authorization/decorators/roles.decorator';
import { Role } from 'authorization/enum/role.enum';
import { CreatePlywoodFormatsDto } from 'entities/plywood-enitity/plywood-formats/dto/create-plywood-formats.dto';
import { CoatingDensityService } from 'entities/plywood-enitity/coating-density/coating-density.service';
import { ENDPOINTS, GLOBAL_PREFIXES } from 'common/consts/endpoints.consts';

@Controller(GLOBAL_PREFIXES.PLYWOOD_COATING_DENSITY)
export class CoatingDensityController {
  constructor(private readonly coatingService: CoatingDensityService) {}

  @Public()
  @Get(ENDPOINTS.PLYWOOD_COATING_DENSITY.GET_ALL)
  async all() {
    return await this.coatingService.getAll();
  }

  @Public()
  @Get(ENDPOINTS.PLYWOOD_COATING_DENSITY.GET_BY_ID)
  async byId(@Param('id', ParseIntPipe) id: number) {
    return await this.coatingService.getById(id);
  }

  @Roles(Role.Admin)
  @Post(ENDPOINTS.PLYWOOD_COATING_DENSITY.CREATE)
  async add(@Body() dto: CreatePlywoodFormatsDto) {
    return await this.coatingService.add(dto);
  }

  @Roles(Role.Admin)
  @Patch(ENDPOINTS.PLYWOOD_COATING_DENSITY.UPDATE)
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto) {
    return await this.coatingService.update(id, dto);
  }

  @Roles(Role.Admin)
  @Delete(ENDPOINTS.PLYWOOD_COATING_DENSITY.DELETE)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.coatingService.remove(id);
  }
}
