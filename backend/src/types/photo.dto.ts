import { IsString } from 'class-validator';

export class PhotoDto {
  @IsString()
  filename: string;

  @IsString()
  path: string;

  @IsString()
  color: string;
}
