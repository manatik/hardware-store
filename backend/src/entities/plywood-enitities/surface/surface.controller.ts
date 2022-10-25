import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { SurfaceService } from './surface.service';
import { CreatePlywoodSurfaceDto } from './dto/create-plywood-surface.dto';
import { Public, Roles } from 'authorization/decorators';
import { Role } from 'authorization/enum/role.enum';
import { ENDPOINTS, GLOBAL_PREFIXES } from 'common/consts/endpoints.consts';

@Roles(Role.Admin)
@Controller(GLOBAL_PREFIXES.PLYWOOD_SURFACE)
export class SurfaceController {
  constructor(private readonly plywoodSurfaceService: SurfaceService) {}

  @Public()
  @Get(ENDPOINTS.PLYWOOD_SURFACE.GET_ALL)
  async all() {
    return await this.plywoodSurfaceService.getAll();
  }

  @Public()
  @Get(ENDPOINTS.PLYWOOD_SURFACE.GET_BY_ID)
  async byId(@Param('id', ParseIntPipe) id: number) {
    return await this.plywoodSurfaceService.getById(id);
  }

  @Post(ENDPOINTS.PLYWOOD_SURFACE.CREATE)
  async add(@Body() dto: CreatePlywoodSurfaceDto) {
    return await this.plywoodSurfaceService.add(dto);
  }

  @Patch(ENDPOINTS.PLYWOOD_SURFACE.UPDATE)
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto) {
    return await this.plywoodSurfaceService.update(id, dto);
  }

  @Delete(ENDPOINTS.PLYWOOD_SURFACE.DELETE)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.plywoodSurfaceService.remove(id);
  }
}
