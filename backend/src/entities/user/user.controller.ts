import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from 'entities/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('all')
  async all() {
    return await this.userService.getAll();
  }

  @Get('info')
  async byId(@Param('id') id: number) {
    return await this.userService.getById(id);
  }

  @Post()
  async create(@Body() dto) {
    return await this.userService.create(dto);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto) {
    return await this.userService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.userService.remove(id);
  }
}
