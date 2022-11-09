import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SurfaceService } from './surface.service';
import { CreatePlywoodSurfaceDto } from './dto/create-plywood-surface.dto';
import { Public, Roles } from '@authorization/decorators';
import { Role } from '@authorization/enum/role.enum';
import { ENDPOINTS, GLOBAL_PREFIXES } from '@consts/endpoints.consts';

@Roles(Role.Admin)
@Controller(GLOBAL_PREFIXES.PLYWOOD_SURFACE)
export class SurfaceController {
  constructor(private readonly plywoodSurfaceService: SurfaceService) {}

  @Public()
  @Get(ENDPOINTS.PLYWOOD_CHARACTERS.GET_ALL)
  async all() {
    return await this.plywoodSurfaceService.getAll();
  }

  @Public()
  @Get(ENDPOINTS.PLYWOOD_CHARACTERS.GET_BY_ID)
  async byId(@Param('id') id: string) {
    return await this.plywoodSurfaceService.getById(id);
  }

  @Post(ENDPOINTS.PLYWOOD_CHARACTERS.CREATE)
  async add(@Body() dto: CreatePlywoodSurfaceDto) {
    return await this.plywoodSurfaceService.add(dto);
  }

  @Patch(ENDPOINTS.PLYWOOD_CHARACTERS.UPDATE)
  async update(@Param('id') id: string, @Body() dto) {
    return await this.plywoodSurfaceService.update(id, dto);
  }

  @Delete(ENDPOINTS.PLYWOOD_CHARACTERS.DELETE)
  async remove(@Param('id') id: string) {
    return await this.plywoodSurfaceService.remove(id);
  }
}
