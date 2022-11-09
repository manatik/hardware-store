import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Available } from '@common-types/enum/Available.enum';

export class CreatePlywoodDto {
  @IsOptional()
  @IsString({ each: true })
  features: string[];

  @IsOptional()
  @IsString({ each: true })
  formats: string[];

  @IsOptional()
  @IsString({ each: true })
  surfaceTypes: string[];

  @IsOptional()
  @IsString({ each: true })
  types: string[];

  @IsOptional()
  @IsString({ each: true })
  sorts: string[];

  @IsOptional()
  @IsString({ each: true })
  coatingDensity: string[];

  @IsOptional()
  @IsString({ each: true })
  widths: string[];

  @IsOptional()
  @IsString({ each: true })
  photos: string[];

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  article: string;

  @IsNotEmpty()
  @IsString()
  categoryId: string;

  @IsNotEmpty()
  @IsEnum(Available)
  available: Available;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  position?: number;
}
