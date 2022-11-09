import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCoatingDensityDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
