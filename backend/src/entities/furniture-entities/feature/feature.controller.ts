import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { Public } from '../../../authorization/decorators/public.decorator';
import { ENDPOINTS, GLOBAL_PREFIXES } from '../../../common/consts/endpoints.consts';
import { Roles } from '../../../authorization/decorators/roles.decorator';
import { Role } from '../../../authorization/enum/role.enum';
import { FeatureService } from './feature.service';
import { CreateFeatureDto } from './dto/create-feature.dto';

@Controller(GLOBAL_PREFIXES.FURNITURE_FEATURE)
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {}

  @Public()
  @Get(ENDPOINTS.FURNITURE_FEATURE.GET_ALL)
  async all() {
    return await this.featureService.getAll();
  }

  @Public()
  @Get(ENDPOINTS.FURNITURE_FEATURE.GET_BY_ID)
  async byId(@Param('id', ParseIntPipe) id: number) {
    return await this.featureService.getById(id);
  }

  @Roles(Role.Admin)
  @Post(ENDPOINTS.FURNITURE_FEATURE.CREATE)
  async add(@Body() dto: CreateFeatureDto) {
    return await this.featureService.add(dto);
  }

  @Roles(Role.Admin)
  @Patch(ENDPOINTS.FURNITURE_FEATURE.UPDATE)
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto) {
    return await this.featureService.update(id, dto);
  }

  @Roles(Role.Admin)
  @Delete(ENDPOINTS.FURNITURE_FEATURE.DELETE)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.featureService.remove(id);
  }
}
