import { Body, Controller, Get, Param, ParseIntPipe, Patch } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { Public } from "../../authorization/decorators/public.decorator";
import { Role } from "../../authorization/enum/role.enum";
import { Roles } from "../../authorization/decorators/roles.decorator";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Public()
  @Get()
  async all() {
    return await this.categoryService.getAll();
  }

  @Public()
  @Get(':id')
  async byId(@Param('id', ParseIntPipe) id: number) {
    return await this.categoryService.getById(id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCategoryDto) {
    return await this.categoryService.update(id, dto);
  }
}