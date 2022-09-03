import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ISuccessResponseType } from 'types/ISuccessResponse.type';
import { PlywoodSurfaceService } from 'entities/plywood-surface/plywood-surface.service';
import { IPlywoodSurface } from 'entities/plywood-surface/types/IPlywoodSurface.interface';
import { CreatePlywoodSurfaceDto } from 'entities/plywood-surface/dto/create-plywood-surface.dto';
import { Public } from 'authorization/decorators/public.decorator';
import { Roles } from 'authorization/decorators/roles.decorator';
import { Role } from 'authorization/enum/role.enum';

@Controller('products/plywood-surface')
export class PlywoodSurfaceController {
  constructor(private readonly plywoodSurfaceService: PlywoodSurfaceService) {}

  @Public()
  @Get()
  async all(): Promise<ISuccessResponseType & { surfaces: IPlywoodSurface[] }> {
    return await this.plywoodSurfaceService.getAll();
  }

  @Public()
  @Get(':id')
  async byId(@Param('id', ParseIntPipe) id: number): Promise<ISuccessResponseType & { surface: IPlywoodSurface }> {
    return await this.plywoodSurfaceService.getById(id);
  }

  @Roles(Role.Admin)
  @Post()
  async add(@Body() dto: CreatePlywoodSurfaceDto): Promise<ISuccessResponseType & { surface: IPlywoodSurface }> {
    return await this.plywoodSurfaceService.add(dto);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto,
  ): Promise<ISuccessResponseType & { surface: IPlywoodSurface }> {
    return await this.plywoodSurfaceService.update(id, dto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ISuccessResponseType & { surface: IPlywoodSurface }> {
    return await this.plywoodSurfaceService.remove(id);
  }
}
