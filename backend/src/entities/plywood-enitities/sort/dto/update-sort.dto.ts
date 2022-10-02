import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSortDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  price: number;
}
