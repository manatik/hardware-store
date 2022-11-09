import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Available } from '@common-types/enum/Available.enum';

export class CreateFurnitureDto {
  @IsOptional()
  @IsString({ each: true })
  features?: string[];

  @IsOptional()
  @IsString({ each: true })
  photos?: string[];

  @IsOptional()
  @IsString({ each: true })
  parameters?: string[];

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

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  width: number;

  @IsNotEmpty()
  @IsNumber()
  height: number;

  @IsNotEmpty()
  @IsNumber()
  depth: number;

  @IsOptional()
  @IsNumber()
  position?: number;
}
