import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Available } from '../../../../types/enum/Available.enum';

export class UpdatePlywoodDto {
  @IsOptional()
  @IsNumber()
  features: number[];

  @IsOptional()
  @IsNumber()
  formats: number[];

  @IsOptional()
  @IsNumber()
  surfaceTypes: number[];

  @IsOptional()
  @IsNumber()
  types: number[];

  @IsOptional()
  @IsNumber()
  sorts: number[];

  @IsOptional()
  @IsNumber()
  coatingDensity: number[];

  @IsOptional()
  @IsNumber()
  widths: number[];

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  article: string;

  @IsOptional()
  @IsNumber()
  categoryId: number;

  @IsOptional()
  @IsEnum(Available)
  available: Available;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  price: number;
}
