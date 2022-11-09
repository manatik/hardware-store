import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Available } from '@common-types/enum/Available.enum';

export class UpdateFurnitureDto {
  @IsOptional()
  @IsString({ each: true })
  features?: string[];

  @IsOptional()
  @IsString({ each: true })
  photos?: string[];

  @IsOptional()
  @IsString({ each: true })
  parameters?: string[];

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  article?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsEnum(Available)
  available?: Available;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  width?: number;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsNumber()
  depth?: number;

  @IsOptional()
  @IsNumber()
  position?: number;
}
