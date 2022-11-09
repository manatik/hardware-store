import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
