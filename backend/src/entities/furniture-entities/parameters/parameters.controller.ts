import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Public, Roles } from '@authorization/decorators';
import { ENDPOINTS, GLOBAL_PREFIXES } from '@consts/endpoints.consts';
import { ParametersService } from './parameters.service';
import { CreateParametersDto } from './dto/create-parameters.dto';
import { UpdateParametersDto } from './dto/update-parameters.dto';
import { Role } from '@authorization/enum/role.enum';

@Roles(Role.Admin)
@Controller(GLOBAL_PREFIXES.FURNITURE_PARAMETERS)
export class ParametersController {
  constructor(private readonly parametersService: ParametersService) {}
  @Public()
  @Get(ENDPOINTS.FURNITURE_CHARACTERS.GET_ALL)
  async all() {
    return await this.parametersService.getAll();
  }

  @Public()
  @Get(ENDPOINTS.FURNITURE_CHARACTERS.GET_BY_ID)
  async byId(@Param('id') id: string) {
    return await this.parametersService.getById(id);
  }

  @Post(ENDPOINTS.FURNITURE_CHARACTERS.CREATE)
  async add(@Body() dto: CreateParametersDto) {
    return await this.parametersService.add(dto);
  }

  @Patch(ENDPOINTS.FURNITURE_CHARACTERS.UPDATE)
  async update(@Param('id') id: string, @Body() dto: UpdateParametersDto) {
    return await this.parametersService.update(id, dto);
  }

  @Delete(ENDPOINTS.FURNITURE_CHARACTERS.DELETE)
  async remove(@Param('id') id: string) {
    return await this.parametersService.remove(id);
  }
}
