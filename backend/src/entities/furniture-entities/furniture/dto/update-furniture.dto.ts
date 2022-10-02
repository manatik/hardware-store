import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Available } from '../../../../types/enum/Available.enum';

export class UpdateFurnitureDto {
  @IsOptional()
  @IsNumber()
  features: number[];

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
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  width: number;

  @IsOptional()
  @IsNumber()
  height: number;

  @IsOptional()
  @IsNumber()
  depth: number;
}
