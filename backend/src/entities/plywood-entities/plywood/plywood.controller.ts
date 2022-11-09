import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PlywoodService } from '@plywood/plywood/plywood.service';
import { CreatePlywoodDto } from '@plywood/plywood/dto/create-plywood.dto';
import { Public, Roles } from '@authorization/decorators';
import { Role } from '@authorization/enum/role.enum';
import { DeletePlywoodQuery } from '@plywood/plywood/dto/delete-plywood.query';
import { ENDPOINTS, GLOBAL_PREFIXES } from '@consts/endpoints.consts';
import { UpdatePlywoodDto } from './dto/update-plywood.dto';
import { PlywoodAllQuery } from './dto/plywood-all.query';

@Roles(Role.Admin)
@Controller(GLOBAL_PREFIXES.PLYWOOD)
export class PlywoodController {
  constructor(private readonly plywoodService: PlywoodService) {}

  @Public()
  @Get(ENDPOINTS.PLYWOOD.GET_ALL)
  async all(@Query() query: PlywoodAllQuery) {
    return await this.plywoodService.getAll(query);
  }

  @Public()
  @Get(ENDPOINTS.PLYWOOD.GET_BY_ID)
  async byId(@Param('id') id: string) {
    return await this.plywoodService.getById(id);
  }

  @Post(ENDPOINTS.PLYWOOD.CREATE)
  async add(@Body() dto: CreatePlywoodDto) {
    return await this.plywoodService.add(dto);
  }

  @Patch(ENDPOINTS.PLYWOOD.UPDATE)
  async update(@Param('id') id: string, @Body() dto: UpdatePlywoodDto) {
    return await this.plywoodService.update(id, dto);
  }

  @Delete(ENDPOINTS.PLYWOOD.DELETE)
  async remove(@Param('id') id: string, @Query() query: DeletePlywoodQuery) {
    return await this.plywoodService.remove(id, query);
  }
}
