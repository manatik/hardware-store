import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ENDPOINTS, GLOBAL_PREFIXES } from 'common/consts/endpoints.consts';
import { Public, Roles } from 'authorization/decorators';
import { Role } from 'authorization/enum/role.enum';
import { TypeService } from './type.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';

@Roles(Role.Admin)
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

  @Post(ENDPOINTS.PLYWOOD_TYPE.CREATE)
  async add(@Body() dto: CreateTypeDto) {
    return await this.typeService.add(dto);
  }

  @Patch(ENDPOINTS.PLYWOOD_TYPE.UPDATE)
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTypeDto) {
    return await this.typeService.update(id, dto);
  }

  @Delete(ENDPOINTS.PLYWOOD_TYPE.DELETE)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.typeService.remove(id);
  }
}
