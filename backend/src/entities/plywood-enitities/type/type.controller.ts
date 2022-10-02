import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ENDPOINTS, GLOBAL_PREFIXES } from 'common/consts/endpoints.consts';
import { Public } from 'authorization/decorators/public.decorator';
import { Roles } from 'authorization/decorators/roles.decorator';
import { Role } from 'authorization/enum/role.enum';
import { TypeService } from 'entities/plywood-enitities/type/type.service';
import { CreateTypeDto } from './dto/create-type.dto';

@Controller(GLOBAL_PREFIXES.PLYWOOD_TYPE)
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Public()
  @Get(ENDPOINTS.PLYWOOD_TYPE.GET_ALL)
  async all() {
    return await this.typeService.getAll();
  }

  @Public()
  @Get(ENDPOINTS.PLYWOOD_TYPE.GET_BY_ID)
  async byId(@Param('id', ParseIntPipe) id: number) {
    return await this.typeService.getById(id);
  }

  @Roles(Role.Admin)
  @Post(ENDPOINTS.PLYWOOD_TYPE.CREATE)
  async add(@Body() dto: CreateTypeDto) {
    return await this.typeService.add(dto);
  }

  @Roles(Role.Admin)
  @Patch(ENDPOINTS.PLYWOOD_TYPE.UPDATE)
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto) {
    return await this.typeService.update(id, dto);
  }

  @Roles(Role.Admin)
  @Delete(ENDPOINTS.PLYWOOD_TYPE.DELETE)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.typeService.remove(id);
  }
}
