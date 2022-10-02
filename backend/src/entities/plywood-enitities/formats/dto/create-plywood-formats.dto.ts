import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlywoodFormatsDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  size: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
