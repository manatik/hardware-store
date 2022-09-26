import { Body, Controller, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PlywoodFormatsService } from 'entities/plywood-formats/plywood-formats.service';
import { CreatePlywoodFormatsDto } from 'entities/plywood-formats/dto/create-plywood-formats.dto';
import { Public } from 'authorization/decorators/public.decorator';
import { Roles } from 'authorization/decorators/roles.decorator';
import { Role } from 'authorization/enum/role.enum';
import { PlywoodFormatsAllQuery } from 'entities/plywood-formats/dto/plywood-formats-all.query';

@Controller('products/plywood-format')
export class PlywoodFormatsController {
  constructor(private readonly plywoodFormatsService: PlywoodFormatsService) {}

  @Public()
  @Get()
  async all(@Query() query: PlywoodFormatsAllQuery) {
    return await this.plywoodFormatsService.getAll(query);
  }

  @Public()
  @Get(':id')
  async byId(@Param('id', ParseIntPipe) id: number) {
    return await this.plywoodFormatsService.getById(id);
  }

  @Roles(Role.Admin)
  @Post()
  async add(@Body() dto: CreatePlywoodFormatsDto) {
    return await this.plywoodFormatsService.add(dto);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto) {
    return await this.plywoodFormatsService.update(id, dto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.plywoodFormatsService.remove(id);
  }
}
