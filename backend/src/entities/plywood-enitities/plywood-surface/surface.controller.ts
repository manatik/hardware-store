import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ISuccessResponseType } from 'types/ISuccessResponse.type';
import { SurfaceService } from 'entities/plywood-enitities/plywood-surface/surface.service';
import { IPlywoodSurface } from 'entities/plywood-enitities/plywood-surface/types/IPlywoodSurface.interface';
import { CreatePlywoodSurfaceDto } from 'entities/plywood-enitities/plywood-surface/dto/create-plywood-surface.dto';
import { Public } from 'authorization/decorators/public.decorator';
import { Roles } from 'authorization/decorators/roles.decorator';
import { Role } from 'authorization/enum/role.enum';
import { ENDPOINTS, GLOBAL_PREFIXES } from 'common/consts/endpoints.consts';

@Controller(GLOBAL_PREFIXES.PLYWOOD_SURFACE)
export class SurfaceController {
  constructor(private readonly plywoodSurfaceService: SurfaceService) {}

  @Public()
  @Get(ENDPOINTS.PLYWOOD_SURFACE.GET_ALL)
  async all(): Promise<ISuccessResponseType & { surfaces: IPlywoodSurface[] }> {
    return await this.plywoodSurfaceService.getAll();
  }

  @Public()
  @Get(ENDPOINTS.PLYWOOD_SURFACE.GET_BY_ID)
  async byId(@Param('id', ParseIntPipe) id: number): Promise<ISuccessResponseType & { surface: IPlywoodSurface }> {
    return await this.plywoodSurfaceService.getById(id);
  }

  @Roles(Role.Admin)
  @Post(ENDPOINTS.PLYWOOD_SURFACE.CREATE)
  async add(@Body() dto: CreatePlywoodSurfaceDto): Promise<ISuccessResponseType & { surface: IPlywoodSurface }> {
    return await this.plywoodSurfaceService.add(dto);
  }

  @Roles(Role.Admin)
  @Patch(ENDPOINTS.PLYWOOD_SURFACE.UPDATE)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto,
  ): Promise<ISuccessResponseType & { surface: IPlywoodSurface }> {
    return await this.plywoodSurfaceService.update(id, dto);
  }

  @Roles(Role.Admin)
  @Delete(ENDPOINTS.PLYWOOD_SURFACE.DELETE)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ISuccessResponseType & { surface: IPlywoodSurface }> {
    return await this.plywoodSurfaceService.remove(id);
  }
}
