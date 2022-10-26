import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { FormatsService } from './formats.service';
import { CreatePlywoodFormatsDto } from './dto/create-plywood-formats.dto';
import { Public, Roles } from 'authorization/decorators';
import { Role } from 'authorization/enum/role.enum';
import { PlywoodFormatsAllQuery } from './dto/plywood-formats-all.query';
import { ENDPOINTS, GLOBAL_PREFIXES } from 'common/consts/endpoints.consts';
import { UpdateFormatsDto } from './dto/update-formats.dto';

@Roles(Role.Admin)
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
  async byId(@Param('id') id: string) {
    return await this.plywoodFormatsService.getById(id);
  }

  @Post(ENDPOINTS.PLYWOOD_FORMATS.CREATE)
  async add(@Body() dto: CreatePlywoodFormatsDto) {
    return await this.plywoodFormatsService.add(dto);
  }

  @Patch(ENDPOINTS.PLYWOOD_FORMATS.UPDATE)
  async update(@Param('id') id: string, @Body() dto: UpdateFormatsDto) {
    return await this.plywoodFormatsService.update(id, dto);
  }

  @Delete(ENDPOINTS.PLYWOOD_FORMATS.DELETE)
  async remove(@Param('id') id: string) {
    return await this.plywoodFormatsService.remove(id);
  }
}
