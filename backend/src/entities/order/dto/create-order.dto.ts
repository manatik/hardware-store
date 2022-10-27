import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class Products {
  @IsOptional()
  @IsString({ each: true })
  plywood?: string[];

  @IsOptional()
  @IsString({ each: true })
  furniture?: string[];

  @IsOptional()
  @IsString({ each: true })
  house?: string[];
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
