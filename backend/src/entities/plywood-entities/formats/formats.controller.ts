import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { FormatsService } from './formats.service';
import { CreatePlywoodFormatsDto } from './dto/create-plywood-formats.dto';
import { Public, Roles } from '@authorization/decorators';
import { Role } from '@authorization/enum/role.enum';
import { ENDPOINTS, GLOBAL_PREFIXES } from '@consts/endpoints.consts';
import { UpdateFormatsDto } from './dto/update-formats.dto';

@Roles(Role.Admin)
@Controller(GLOBAL_PREFIXES.PLYWOOD_FORMATS)
export class FormatsController {
  constructor(private readonly plywoodFormatsService: FormatsService) {}

  @Public()
  @Get(ENDPOINTS.PLYWOOD_CHARACTERS.GET_ALL)
  async all() {
    return await this.plywoodFormatsService.getAll();
  }

  @Public()
  @Get(ENDPOINTS.PLYWOOD_CHARACTERS.GET_BY_ID)
  async byId(@Param('id') id: string) {
    return await this.plywoodFormatsService.getById(id);
  }

  @Post(ENDPOINTS.PLYWOOD_CHARACTERS.CREATE)
  async add(@Body() dto: CreatePlywoodFormatsDto) {
    return await this.plywoodFormatsService.add(dto);
  }

  @Patch(ENDPOINTS.PLYWOOD_CHARACTERS.UPDATE)
  async update(@Param('id') id: string, @Body() dto: UpdateFormatsDto) {
    return await this.plywoodFormatsService.update(id, dto);
  }

  @Delete(ENDPOINTS.PLYWOOD_CHARACTERS.DELETE)
  async remove(@Param('id') id: string) {
    return await this.plywoodFormatsService.remove(id);
  }
}
