import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Available } from 'types/enum/Available.enum';

export class UpdatePlywoodDto {
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
