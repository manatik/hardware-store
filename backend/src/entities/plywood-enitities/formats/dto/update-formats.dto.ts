import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateFormatsDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  size: string;

  @IsOptional()
  @IsNumber()
  price: number;
}
