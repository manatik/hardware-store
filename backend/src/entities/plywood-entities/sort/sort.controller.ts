import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ENDPOINTS, GLOBAL_PREFIXES } from '@consts/endpoints.consts';
import { Public, Roles } from '@authorization/decorators';
import { Role } from '@authorization/enum/role.enum';
import { SortService } from '@plywood/sort/sort.service';
import { CreateSortDto } from './dto/create-sort.dto';
import { UpdateSortDto } from './dto/update-sort.dto';

@Roles(Role.Admin)
@Controller(GLOBAL_PREFIXES.PLYWOOD_SORT)
export class SortController {
  constructor(private readonly sortService: SortService) {}

  @Public()
  @Get(ENDPOINTS.PLYWOOD_CHARACTERS.GET_ALL)
  async all() {
    return await this.sortService.getAll();
  }

  @Public()
  @Get(ENDPOINTS.PLYWOOD_CHARACTERS.GET_BY_ID)
  async byId(@Param('id') id: string) {
    return await this.sortService.getById(id);
  }

  @Post(ENDPOINTS.PLYWOOD_CHARACTERS.CREATE)
  async add(@Body() dto: CreateSortDto) {
    return await this.sortService.add(dto);
  }

  @Patch(ENDPOINTS.PLYWOOD_CHARACTERS.UPDATE)
  async update(@Param('id') id: string, @Body() dto: UpdateSortDto) {
    return await this.sortService.update(id, dto);
  }

  @Delete(ENDPOINTS.PLYWOOD_CHARACTERS.DELETE)
  async remove(@Param('id') id: string) {
    return await this.sortService.remove(id);
  }
}
