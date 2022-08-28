import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ISuccessResponseType } from 'types/ISuccessResponse.type';
import { IPlywoodFormat } from 'entities/plywood-formats/types/IPlywoodFormat.interface';
import { PlywoodFormatsService } from 'entities/plywood-formats/plywood-formats.service';
import { CreatePlywoodFormatsDto } from 'entities/plywood-formats/dto/create-plywood-formats.dto';
import { Public } from 'authorization/decorators/public.decorator';

@Public()
@Controller('products/plywood-format')
export class PlywoodFormatsController {
  constructor(private readonly plywoodFormatsService: PlywoodFormatsService) {}

  @Get()
  async all(): Promise<ISuccessResponseType & { formats: IPlywoodFormat[] }> {
    return await this.plywoodFormatsService.getAll();
  }

  @Get(':id')
  async byId(@Param('id', ParseIntPipe) id: number): Promise<ISuccessResponseType & { format: IPlywoodFormat }> {
    return await this.plywoodFormatsService.getById(id);
  }

  @Post()
  async add(@Body() dto: CreatePlywoodFormatsDto): Promise<ISuccessResponseType & { format: IPlywoodFormat }> {
    return await this.plywoodFormatsService.add(dto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto,
  ): Promise<ISuccessResponseType & { format: IPlywoodFormat }> {
    return await this.plywoodFormatsService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ISuccessResponseType & { format: IPlywoodFormat }> {
    return await this.plywoodFormatsService.remove(id);
  }
}
