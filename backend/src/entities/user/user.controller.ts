import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser, Roles } from '@authorization/decorators';
import { Role } from '@authorization/enum/role.enum';
import { UserInfoQuery } from './dto/user-info.query';
import { UserAllQuery } from './dto/user-all.query';
import { ENDPOINTS, GLOBAL_PREFIXES } from '@consts/endpoints.consts';
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
  async byId(@CurrentUser() user, @Query() query: UserInfoQuery) {
    return await this.userService.getById(user.id, query);
  }

  @Post(ENDPOINTS.USER.CREATE)
  async create(@Body() dto) {
    return await this.userService.create(dto);
  }

  @Patch(ENDPOINTS.USER.ADD_ROLE)
  async addRoleToUser(@CurrentUser() user, @Body() dto: UserRoleDto) {
    return await this.userService.addRole(user.id, dto.roleId);
  }

  @Patch(ENDPOINTS.USER.REMOVE_ROLE)
  async removeRoleToUser(@CurrentUser() user, @Body() dto: UserRoleDto) {
    return await this.userService.removeRole(user.id, dto.roleId);
  }

  @Roles(Role.User)
  @Patch(ENDPOINTS.USER.UPDATE)
  async update(@CurrentUser() user, @Body() dto) {
    return await this.userService.update(user.id, dto);
  }

  @Delete(ENDPOINTS.USER.DELETE)
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}
