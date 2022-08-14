import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RoleService } from 'entities/role/role.service';
import { CreateRoleDto } from 'entities/role/dto/create-role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Get()
  async getAll() {
    return await this.roleService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.roleService.getById(id);
  }

  @Post()
  async create(@Body() dto: CreateRoleDto) {
    return await this.roleService.create(dto);
  }

  @Patch()
  async update(@Param('id') id: number, @Body() dto) {
    return await this.roleService.update(id, dto);
  }

  @Delete()
  async delete(@Param('id') id: number) {
    return await this.roleService.delete(id);
  }
}
