import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlywoodDto {
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
  price: number;
}
