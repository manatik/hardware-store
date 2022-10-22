import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  plywoods: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  houses: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  furnitures: number[];

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
