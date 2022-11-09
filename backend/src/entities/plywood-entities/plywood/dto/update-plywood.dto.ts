import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Available } from '@common-types/enum/Available.enum';

export class UpdatePlywoodDto {
  @IsOptional()
  @IsString({ each: true })
  features?: string[];

  @IsOptional()
  @IsString({ each: true })
  formats?: string[];

  @IsOptional()
  @IsString({ each: true })
  surfaceTypes?: string[];

  @IsOptional()
  @IsString({ each: true })
  types?: string[];

  @IsOptional()
  @IsString({ each: true })
  sorts?: string[];

  @IsOptional()
  @IsString({ each: true })
  coatingDensity?: string[];

  @IsOptional()
  @IsString({ each: true })
  widths?: string[];

  @IsOptional()
  @IsString({ each: true })
  photos?: string[];

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
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  position?: number;
}
