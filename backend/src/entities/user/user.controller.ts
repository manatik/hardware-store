import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { UserService } from 'entities/user/user.service';
import { Roles } from 'authorization/decorators/roles.decorator';
import { Role } from 'authorization/enum/role.enum';
import { Request } from 'express';
import { UserInfoQuery } from 'entities/user/dto/user-info.query';

@Roles(Role.Admin)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async all() {
    return await this.userService.getAll();
  }

  @Roles(Role.User)
  @Get('info')
  async byId(@Req() req: Request & { user: any }, @Query() query: UserInfoQuery) {
    return await this.userService.getById(req.user.id, query);
  }

  @Post()
  async create(@Body() dto) {
    return await this.userService.create(dto);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto) {
    return await this.userService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.remove(id);
  }
}
