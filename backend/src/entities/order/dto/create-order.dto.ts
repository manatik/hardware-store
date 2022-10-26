import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  plywoods?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  houses?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  furnitures?: string[];

  @IsOptional()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  fio: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  email: string;
}
