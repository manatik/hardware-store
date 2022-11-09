import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { FeatureService } from './feature.service';
import { Public, Roles } from '@authorization/decorators';
import { ENDPOINTS, GLOBAL_PREFIXES } from '@consts/endpoints.consts';
import { Role } from '@authorization/enum/role.enum';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';

@Roles(Role.Admin)
@Controller(GLOBAL_PREFIXES.PLYWOOD_FEATURE)
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {}

  @Public()
  @Get(ENDPOINTS.PLYWOOD_CHARACTERS.GET_ALL)
  async all() {
    return await this.featureService.getAll();
  }

  @Public()
  @Get(ENDPOINTS.PLYWOOD_CHARACTERS.GET_BY_ID)
  async byId(@Param('id') id: string) {
    return await this.featureService.getById(id);
  }

  @Post(ENDPOINTS.PLYWOOD_CHARACTERS.CREATE)
  async add(@Body() dto: CreateFeatureDto) {
    return await this.featureService.add(dto);
  }

  @Patch(ENDPOINTS.PLYWOOD_CHARACTERS.UPDATE)
  async update(@Param('id') id: string, @Body() dto: UpdateFeatureDto) {
    return await this.featureService.update(id, dto);
  }

  @Delete(ENDPOINTS.PLYWOOD_CHARACTERS.DELETE)
  async remove(@Param('id') id: string) {
    return await this.featureService.remove(id);
  }
}
