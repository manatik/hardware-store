import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Available } from '../../../../types/enum/Available.enum';

export class CreatePlywoodDto {
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

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  article: string;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @IsNotEmpty()
  @IsNumber()
  width: number;

  @IsNotEmpty()
  @IsEnum(Available)
  available: Available;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
