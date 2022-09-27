import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { FormatsService } from 'entities/plywood-enitities/plywood-formats/formats.service';
import { CreatePlywoodFormatsDto } from 'entities/plywood-enitities/plywood-formats/dto/create-plywood-formats.dto';
import { Public } from 'authorization/decorators/public.decorator';
import { Roles } from 'authorization/decorators/roles.decorator';
import { Role } from 'authorization/enum/role.enum';
import { PlywoodFormatsAllQuery } from 'entities/plywood-enitities/plywood-formats/dto/plywood-formats-all.query';
import { ENDPOINTS, GLOBAL_PREFIXES } from 'common/consts/endpoints.consts';

@Controller(GLOBAL_PREFIXES.PLYWOOD_FORMATS)
export class FormatsController {
  constructor(private readonly plywoodFormatsService: FormatsService) {}

  @Public()
  @Get(ENDPOINTS.PLYWOOD_FORMATS.GET_ALL)
  async all(@Query() query: PlywoodFormatsAllQuery) {
    return await this.plywoodFormatsService.getAll(query);
  }

  @Public()
  @Get(ENDPOINTS.PLYWOOD_FORMATS.GET_BY_ID)
  async byId(@Param('id', ParseIntPipe) id: number) {
    return await this.plywoodFormatsService.getById(id);
  }

  @Roles(Role.Admin)
  @Post(ENDPOINTS.PLYWOOD_FORMATS.CREATE)
  async add(@Body() dto: CreatePlywoodFormatsDto) {
    return await this.plywoodFormatsService.add(dto);
  }

  @Roles(Role.Admin)
  @Patch(ENDPOINTS.PLYWOOD_FORMATS.UPDATE)
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto) {
    return await this.plywoodFormatsService.update(id, dto);
  }

  @Roles(Role.Admin)
  @Delete(ENDPOINTS.PLYWOOD_FORMATS.DELETE)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.plywoodFormatsService.remove(id);
  }
}
