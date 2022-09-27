import { Body, Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Public } from 'authorization/decorators/public.decorator';
import { Role } from 'authorization/enum/role.enum';
import { Roles } from 'authorization/decorators/roles.decorator';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ICategory } from 'entities/category/types/ICategory.interface';
import { ISuccessResponseType } from 'types/ISuccessResponse.type';
import { ENDPOINTS, GLOBAL_PREFIXES } from 'common/consts/endpoints.consts';

@Controller(GLOBAL_PREFIXES.CATEGORY)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Public()
  @Get(ENDPOINTS.CATEGORY.GET_ALL)
  async all(): Promise<ISuccessResponseType & { categories: ICategory[] }> {
    return await this.categoryService.getAll();
  }

  @Roles(Role.User)
  @Public()
  @Get(ENDPOINTS.CATEGORY.GET_BY_ID)
  async byId(@Param('id', ParseIntPipe) id: number): Promise<ISuccessResponseType & { category: ICategory }> {
    return await this.categoryService.getById(id);
  }

  @Roles(Role.Admin)
  @Patch(ENDPOINTS.CATEGORY.UPDATE)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto,
  ): Promise<ISuccessResponseType & { category: ICategory }> {
    return await this.categoryService.update(id, dto);
  }
}
