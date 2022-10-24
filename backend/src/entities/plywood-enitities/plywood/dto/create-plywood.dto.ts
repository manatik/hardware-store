import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Available } from '../../../../types/enum/Available.enum';

export class CreatePlywoodDto {
  @IsOptional()
  @IsNumber({}, { each: true })
  features: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  formats: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  surfaceTypes: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  types: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  sorts: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  coatingDensity: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  widths: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  photos: number[];

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
  @IsEnum(Available)
  available: Available;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
