import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ENDPOINTS, GLOBAL_PREFIXES } from '@consts/endpoints.consts';
import { Public, Roles } from '@authorization/decorators';
import { Role } from '@authorization/enum/role.enum';
import { CreateWidthDto } from './dto/create-width.dto';
import { UpdateWidthDto } from './dto/update-width.dto';
import { WidthService } from './width.service';

@Roles(Role.Admin)
@Controller(GLOBAL_PREFIXES.PLYWOOD_WIDTH)
export class WidthController {
  constructor(private readonly widthService: WidthService) {}

  @Public()
  @Get(ENDPOINTS.PLYWOOD_CHARACTERS.GET_ALL)
  async all() {
    return await this.widthService.getAll();
  }

  @Public()
  @Get(ENDPOINTS.PLYWOOD_CHARACTERS.GET_BY_ID)
  async byId(@Param('id') id: string) {
    return await this.widthService.getById(id);
  }

  @Post(ENDPOINTS.PLYWOOD_CHARACTERS.CREATE)
  async add(@Body() dto: CreateWidthDto) {
    return await this.widthService.add(dto);
  }

  @Patch(ENDPOINTS.PLYWOOD_CHARACTERS.UPDATE)
  async update(@Param('id') id: string, @Body() dto: UpdateWidthDto) {
    return await this.widthService.update(id, dto);
  }

  @Delete(ENDPOINTS.PLYWOOD_CHARACTERS.DELETE)
  async remove(@Param('id') id: string) {
    return await this.widthService.remove(id);
  }
}
