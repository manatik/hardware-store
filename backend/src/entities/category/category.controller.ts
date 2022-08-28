import { Body, Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Public } from 'authorization/decorators/public.decorator';
import { Role } from 'authorization/enum/role.enum';
import { Roles } from 'authorization/decorators/roles.decorator';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ICategory } from 'entities/category/types/ICategory.interface';
import { ISuccessResponseType } from 'types/ISuccessResponse.type';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Public()
  @Get()
  async all(): Promise<ISuccessResponseType & { categories: ICategory[] }> {
    return await this.categoryService.getAll();
  }

  @Roles(Role.User)
  @Public()
  @Get(':id')
  async byId(@Param('id', ParseIntPipe) id: number): Promise<ISuccessResponseType & { category: ICategory }> {
    return await this.categoryService.getById(id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto,
  ): Promise<ISuccessResponseType & { category: ICategory }> {
    return await this.categoryService.update(id, dto);
  }
}
