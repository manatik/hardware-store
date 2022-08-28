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

@Public()
@Controller('products/plywood')
export class PlywoodController {
  constructor(private readonly plywoodService: PlywoodService) {}

  @Get()
  async all(): Promise<ISuccessResponseType & { products: IPlywood[] }> {
    return await this.plywoodService.getAll();
  }

  @Get(':id')
  async byId(@Param('id', ParseIntPipe) id: number): Promise<ISuccessResponseType & { product: IPlywood }> {
    return await this.plywoodService.getById(id);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('photos'))
  async add(
    @UploadedFiles() photos: Array<Express.Multer.File>,
    @Body() dto: CreatePlywoodDto,
  ): Promise<ISuccessResponseType & { product: IPlywood }> {
    return await this.plywoodService.add(dto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto,
  ): Promise<ISuccessResponseType & { product: IPlywood }> {
    return await this.plywoodService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ISuccessResponseType & { product: IPlywood }> {
    return await this.plywoodService.remove(id);
  }
}
