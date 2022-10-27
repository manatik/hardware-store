import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

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

export class Plywood {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  count: number;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsString()
  format: string;

  @IsNotEmpty()
  @IsString()
  widthPlywood: string;

  @IsNotEmpty()
  @IsString()
  sort: string;
}

export class Furniture {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsNotEmpty()
  @IsNumber()
  count: number;

  @IsNotEmpty()
  @IsNumber()
  width: number;

  @IsNotEmpty()
  @IsNumber()
  height: number;

  @IsNotEmpty()
  @IsNumber()
  depth: number;
}

export class SendEmailDto {
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Products)
  products: Products;

  @IsNotEmpty()
  @IsString()
  fio: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  message: string;
}
