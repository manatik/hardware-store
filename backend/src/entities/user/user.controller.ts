import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req } from '@nestjs/common';
import { UserService } from 'entities/user/user.service';
import { Roles } from 'authorization/decorators/roles.decorator';
import { Role } from 'authorization/enum/role.enum';
import { Request } from 'express';
import { UserInfoQuery } from 'entities/user/dto/user-info.query';
import { UserAllQuery } from 'entities/user/dto/user-all.query';
import { ENDPOINTS, GLOBAL_PREFIXES } from 'common/consts/endpoints.consts';

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

  @Patch(ENDPOINTS.USER.UPDATE)
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto) {
    return await this.userService.update(id, dto);
  }

  @Delete(ENDPOINTS.USER.DELETE)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.remove(id);
  }
}
