import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ISuccessResponseType } from 'types/ISuccessResponse.type';
import { PlywoodSurfaceService } from 'entities/plywood-surface/plywood-surface.service';
import { IPlywoodSurface } from 'entities/plywood-surface/types/IPlywoodSurface.interface';
import { CreatePlywoodSurfaceDto } from 'entities/plywood-surface/dto/create-plywood-surface.dto';
import { Public } from 'authorization/decorators/public.decorator';

@Public()
@Controller('products/plywood-surface')
export class PlywoodSurfaceController {
  constructor(private readonly plywoodSurfaceService: PlywoodSurfaceService) {}

  @Get()
  async all(): Promise<ISuccessResponseType & { surfaces: IPlywoodSurface[] }> {
    return await this.plywoodSurfaceService.getAll();
  }

  @Get(':id')
  async byId(@Param('id', ParseIntPipe) id: number): Promise<ISuccessResponseType & { surface: IPlywoodSurface }> {
    return await this.plywoodSurfaceService.getById(id);
  }

  @Post()
  async add(@Body() dto: CreatePlywoodSurfaceDto): Promise<ISuccessResponseType & { surface: IPlywoodSurface }> {
    return await this.plywoodSurfaceService.add(dto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto,
  ): Promise<ISuccessResponseType & { surface: IPlywoodSurface }> {
    return await this.plywoodSurfaceService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ISuccessResponseType & { surface: IPlywoodSurface }> {
    return await this.plywoodSurfaceService.remove(id);
  }
}
