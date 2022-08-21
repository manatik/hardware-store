import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class CreateFurnitureDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  article: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  categoryId: number;
}