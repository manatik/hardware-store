import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from 'entities/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('all')
  async getAll() {
    return await this.userService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
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
  async delete(@Param('id') id: number) {
    return await this.userService.delete(id);
  }
}
