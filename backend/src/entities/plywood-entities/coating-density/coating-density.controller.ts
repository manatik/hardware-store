import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Public, Roles } from '@authorization/decorators';
import { Role } from '@authorization/enum/role.enum';
import { CoatingDensityService } from '@plywood/coating-density/coating-density.service';
import { ENDPOINTS, GLOBAL_PREFIXES } from '@consts/endpoints.consts';
import { CreateCoatingDensityDto } from './dto/create-coating-density.dto';
import { UpdateCoatingDensityDto } from './dto/update-coating-density.dto';

@Roles(Role.Admin)
@Controller(GLOBAL_PREFIXES.PLYWOOD_COATING_DENSITY)
export class CoatingDensityController {
  constructor(private readonly coatingService: CoatingDensityService) {}

  @Public()
  @Get(ENDPOINTS.PLYWOOD_CHARACTERS.GET_ALL)
  async all() {
    return await this.coatingService.getAll();
  }

  @Public()
  @Get(ENDPOINTS.PLYWOOD_CHARACTERS.GET_BY_ID)
  async byId(@Param('id') id: string) {
    return await this.coatingService.getById(id);
  }

  @Post(ENDPOINTS.PLYWOOD_CHARACTERS.CREATE)
  async add(@Body() dto: CreateCoatingDensityDto) {
    return await this.coatingService.add(dto);
  }

  @Patch(ENDPOINTS.PLYWOOD_CHARACTERS.UPDATE)
  async update(@Param('id') id: string, @Body() dto: UpdateCoatingDensityDto) {
    return await this.coatingService.update(id, dto);
  }

  @Delete(ENDPOINTS.PLYWOOD_CHARACTERS.DELETE)
  async remove(@Param('id') id: string) {
    return await this.coatingService.remove(id);
  }
}
