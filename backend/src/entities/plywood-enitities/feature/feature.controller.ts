import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { FeatureService } from './feature.service';
import { Public } from '../../../authorization/decorators/public.decorator';
import { ENDPOINTS, GLOBAL_PREFIXES } from '../../../common/consts/endpoints.consts';
import { Roles } from '../../../authorization/decorators/roles.decorator';
import { Role } from '../../../authorization/enum/role.enum';
import { CreateFeatureDto } from '../../furniture-entities/feature/dto/create-feature.dto';

@Roles(Role.Admin)
@Controller(GLOBAL_PREFIXES.PLYWOOD_FEATURE)
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {}

  @Public()
  @Get(ENDPOINTS.PLYWOOD_FEATURE.GET_ALL)
  async all() {
    return await this.featureService.getAll();
  }

  @Public()
  @Get(ENDPOINTS.PLYWOOD_FEATURE.GET_BY_ID)
  async byId(@Param('id', ParseIntPipe) id: number) {
    return await this.featureService.getById(id);
  }

  @Post(ENDPOINTS.PLYWOOD_FEATURE.CREATE)
  async add(@Body() dto: CreateFeatureDto) {
    return await this.featureService.add(dto);
  }

  @Patch(ENDPOINTS.PLYWOOD_FEATURE.UPDATE)
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto) {
    return await this.featureService.update(id, dto);
  }

  @Delete(ENDPOINTS.PLYWOOD_FEATURE.DELETE)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.featureService.remove(id);
  }
}
