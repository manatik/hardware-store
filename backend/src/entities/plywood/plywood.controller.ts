import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PlywoodService } from 'entities/plywood/plywood.service';
import { CreatePlywoodDto } from 'entities/plywood/dto/create-plywood.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Public } from 'authorization/decorators/public.decorator';
import { ISuccessResponseType } from 'types/ISuccessResponse.type';
import { IPlywood } from 'entities/plywood/types/IPlywood.interface';
import { Roles } from 'authorization/decorators/roles.decorator';
import { Role } from 'authorization/enum/role.enum';

@Controller('products/plywood')
export class PlywoodController {
  constructor(private readonly plywoodService: PlywoodService) {}

  @Public()
  @Get()
  async all(): Promise<ISuccessResponseType & { products: IPlywood[] }> {
    return await this.plywoodService.getAll();
  }

  @Public()
  @Get(':id')
  async byId(@Param('id', ParseIntPipe) id: number): Promise<ISuccessResponseType & { product: IPlywood }> {
    return await this.plywoodService.getById(id);
  }

  @Roles(Role.Admin)
  @Post()
  @UseInterceptors(FilesInterceptor('photos'))
  async add(
    @UploadedFiles() photos: Array<Express.Multer.File>,
    @Body() dto: CreatePlywoodDto,
  ): Promise<ISuccessResponseType & { product: IPlywood }> {
    return await this.plywoodService.add(dto);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto,
  ): Promise<ISuccessResponseType & { product: IPlywood }> {
    return await this.plywoodService.update(id, dto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ISuccessResponseType & { product: IPlywood }> {
    return await this.plywoodService.remove(id);
  }
}
