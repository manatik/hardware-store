import { IsJSON, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateFurnitureDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  article: string;

  @IsOptional()
  @IsJSON({ each: true })
  photos: {
    filename: string;
    path: string;
    size: string;
  }
}