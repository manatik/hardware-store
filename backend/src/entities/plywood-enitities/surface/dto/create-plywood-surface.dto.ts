import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlywoodSurfaceDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
