import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Roles } from '@authorization/decorators';
import { Role } from '@authorization/enum/role.enum';
import { ENDPOINTS, GLOBAL_PREFIXES } from '@consts/endpoints.consts';

@Roles(Role.Admin)
@Controller(GLOBAL_PREFIXES.ROLE)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get(ENDPOINTS.ROLE.ALL)
  async getAll() {
    return await this.roleService.getAll();
  }

  @Get(ENDPOINTS.ROLE.GET_BY_ID)
  async getById(@Param('id') id: string) {
    return await this.roleService.getById(id);
  }

  @Post(ENDPOINTS.ROLE.CREATE)
  async create(@Body() dto: CreateRoleDto) {
    return await this.roleService.create(dto);
  }

  @Patch(ENDPOINTS.ROLE.UPDATE)
  async update(@Param('id') id: string, @Body() dto) {
    return await this.roleService.update(id, dto);
  }

  @Delete(ENDPOINTS.ROLE.DELETE)
  async delete(@Param('id') id: string) {
    return await this.roleService.delete(id);
  }
}
