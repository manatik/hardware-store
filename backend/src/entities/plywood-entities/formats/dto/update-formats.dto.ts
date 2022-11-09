import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateFormatsDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  price?: number;
}
