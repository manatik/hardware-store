import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePlywoodFormatsDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
