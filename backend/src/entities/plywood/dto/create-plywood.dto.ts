import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePlywoodDto {
  @IsOptional()
  @IsString({ each: true })
  formatIds: string[];

  @IsOptional()
  @IsString({ each: true })
  surfaceIds: string[];

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  article: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  categoryId: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  width: number;

  @IsNotEmpty()
  @IsString()
  class: string;

  @IsNotEmpty()
  @IsString()
  densityPlywood: string;

  @IsNotEmpty()
  @IsString()
  glue: string;

  @IsNotEmpty()
  @IsString()
  membraneType: string;

  @IsNotEmpty()
  @IsString()
  densityMembrane: string;

  @IsNotEmpty()
  @IsString()
  guaranteePeriod: string;

  @IsNotEmpty()
  @IsString()
  humidity: string;

  @IsNotEmpty()
  @IsString()
  wearResistance: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  price: number;
}
