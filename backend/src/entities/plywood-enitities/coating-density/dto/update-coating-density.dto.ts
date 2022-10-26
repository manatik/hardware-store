import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCoatingDensityDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  price?: number;
}
