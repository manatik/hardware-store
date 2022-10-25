import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ENDPOINTS, GLOBAL_PREFIXES } from 'common/consts/endpoints.consts';
import { Public, Roles } from 'authorization/decorators';
import { Role } from 'authorization/enum/role.enum';
import { SortService } from 'entities/plywood-enitities/sort/sort.service';
import { CreateSortDto } from './dto/create-sort.dto';
import { UpdateSortDto } from './dto/update-sort.dto';

@Roles(Role.Admin)
@Controller(GLOBAL_PREFIXES.PLYWOOD_SORT)
export class SortController {
  constructor(private readonly sortService: SortService) {}

  @Public()
  @Get(ENDPOINTS.PLYWOOD_SORT.GET_ALL)
  async all() {
    return await this.sortService.getAll();
  }

  @Public()
  @Get(ENDPOINTS.PLYWOOD_SORT.GET_BY_ID)
  async byId(@Param('id', ParseIntPipe) id: number) {
    return await this.sortService.getById(id);
  }

  @Post(ENDPOINTS.PLYWOOD_SORT.CREATE)
  async add(@Body() dto: CreateSortDto) {
    return await this.sortService.add(dto);
  }

  @Patch(ENDPOINTS.PLYWOOD_SORT.UPDATE)
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSortDto) {
    return await this.sortService.update(id, dto);
  }

  @Delete(ENDPOINTS.PLYWOOD_SORT.DELETE)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.sortService.remove(id);
  }
}
