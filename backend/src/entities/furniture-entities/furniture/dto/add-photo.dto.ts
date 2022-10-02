import { IsNotEmpty, IsString } from 'class-validator';

export class AddPhotoDto {
  @IsNotEmpty()
  @IsString()
  color: string;
}
