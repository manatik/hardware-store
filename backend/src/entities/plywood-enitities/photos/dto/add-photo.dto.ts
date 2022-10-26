import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddPhotoDto {
  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
