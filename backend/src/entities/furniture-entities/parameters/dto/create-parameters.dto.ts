import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateParametersDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  value?: string;
}
