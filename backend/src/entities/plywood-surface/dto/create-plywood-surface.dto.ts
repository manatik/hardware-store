import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlywoodSurfaceDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
