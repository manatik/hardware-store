import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class Plywood {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  count: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}

export class Furniture {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  count: number;

  @IsOptional()
  @IsNumber()
  price?: number;
}

export class Products {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Plywood)
  plywood?: Plywood[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Furniture)
  furniture?: Furniture[];
}

export class CreateOrderDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Products)
  products: Products;

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
