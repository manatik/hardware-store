import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Public, Roles } from '@authorization/decorators';
import { Role } from '@authorization/enum/role.enum';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ENDPOINTS, GLOBAL_PREFIXES } from '@consts/endpoints.consts';

@Roles(Role.Admin)
@Controller(GLOBAL_PREFIXES.CATEGORY)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Public()
  @Get(ENDPOINTS.CATEGORY.GET_ALL)
  async all() {
    return await this.categoryService.getAll();
  }

  @Public()
  @Get(ENDPOINTS.CATEGORY.GET_BY_ID)
  async byId(@Param('id') id: string) {
    return await this.categoryService.getById(id);
  }

  @Patch(ENDPOINTS.CATEGORY.UPDATE)
  async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return await this.categoryService.update(id, dto);
  }
}
