import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ISuccessResponseType } from 'types/ISuccessResponse.type';
import { IPlywoodFormat } from 'entities/plywood-formats/types/IPlywoodFormat.interface';
import { PlywoodFormatsService } from 'entities/plywood-formats/plywood-formats.service';
import { CreatePlywoodFormatsDto } from 'entities/plywood-formats/dto/create-plywood-formats.dto';
import { Public } from 'authorization/decorators/public.decorator';
import { Roles } from 'authorization/decorators/roles.decorator';
import { Role } from 'authorization/enum/role.enum';

@Controller('products/plywood-format')
export class PlywoodFormatsController {
  constructor(private readonly plywoodFormatsService: PlywoodFormatsService) {}

  @Public()
  @Get()
  async all(): Promise<ISuccessResponseType & { formats: {[key: string]: IPlywoodFormat[]} }> {
    return await this.plywoodFormatsService.getAll();
  }

  @Public()
  @Get(':id')
  async byId(@Param('id', ParseIntPipe) id: number): Promise<ISuccessResponseType & { format: IPlywoodFormat }> {
    return await this.plywoodFormatsService.getById(id);
  }

  @Roles(Role.Admin)
  @Post()
  async add(@Body() dto: CreatePlywoodFormatsDto): Promise<ISuccessResponseType & { format: IPlywoodFormat }> {
    return await this.plywoodFormatsService.add(dto);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto,
  ): Promise<ISuccessResponseType & { format: IPlywoodFormat }> {
    return await this.plywoodFormatsService.update(id, dto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ISuccessResponseType & { format: IPlywoodFormat }> {
    return await this.plywoodFormatsService.remove(id);
  }
}
