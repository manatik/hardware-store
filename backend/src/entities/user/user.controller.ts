import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req } from '@nestjs/common';
import { UserService } from 'entities/user/user.service';
import { Roles } from 'authorization/decorators/roles.decorator';
import { Role } from 'authorization/enum/role.enum';
import { Request } from 'express';
import { UserInfoQuery } from 'entities/user/dto/user-info.query';
import { UserAllQuery } from 'entities/user/dto/user-all.query';
import { ENDPOINTS, GLOBAL_PREFIXES } from 'common/consts/endpoints.consts';
import { UserRoleDto } from './dto/user-role.dto';

@Roles(Role.Admin)
@Controller(GLOBAL_PREFIXES.USER)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(ENDPOINTS.USER.ALL)
  async all(@Query() query: UserAllQuery) {
    return await this.userService.getAll(query);
  }

  @Roles(Role.User)
  @Get(ENDPOINTS.USER.INFO)
  async byId(@Req() req: Request & { user: any }, @Query() query: UserInfoQuery) {
    return await this.userService.getById(req.user.id, query);
  }

  @Post(ENDPOINTS.USER.CREATE)
  async create(@Body() dto) {
    return await this.userService.create(dto);
  }

  @Patch(ENDPOINTS.USER.ADD_ROLE)
  async addRoleToUser(@Req() req: Request & { user: any }, @Body() dto: UserRoleDto) {
    console.log(req.user, dto);
    return await this.userService.addRole(req.user.id, dto.roleId);
  }

  @Patch(ENDPOINTS.USER.REMOVE_ROLE)
  async removeRoleToUser(@Req() req: Request & { user: any }, @Body() dto: UserRoleDto) {
    return await this.userService.removeRole(req.user.id, dto.roleId);
  }

  @Patch(ENDPOINTS.USER.UPDATE)
  async update(@Req() req: Request & { user: any }, @Body() dto) {
    return await this.userService.update(req.user.id, dto);
  }

  @Delete(ENDPOINTS.USER.DELETE)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.remove(id);
  }
}
