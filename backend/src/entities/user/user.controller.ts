import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UserService } from 'entities/user/user.service';
import { Roles } from 'authorization/decorators/roles.decorator';
import { Role } from 'authorization/enum/role.enum';

@Roles(Role.Admin)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async all() {
    return await this.userService.getAll();
  }

  @Roles(Role.User)
  @Get('info/:id')
  async byId(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getById(id);
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
