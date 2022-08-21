import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CategoryService } from "./category.service";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async all() {
    return await this.categoryService.getAll();
  }

  @Get(":id")
  async byId(@Param('id') id: number) {
    return await this.categoryService.getById(id);
  }

  @Post()
  async add() {
    return Promise.resolve("add product");
  }

  @Patch(":id")
  async update(@Param('id') id: number, @Body() dto) {
    return await this.categoryService.update(id, dto);
  }

  @Delete(":id")
  async remove() {
    return Promise.resolve("remove product");
  }
}