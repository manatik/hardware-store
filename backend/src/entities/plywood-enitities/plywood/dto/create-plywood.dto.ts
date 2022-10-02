import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
  @IsBoolean()
  available: boolean;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
