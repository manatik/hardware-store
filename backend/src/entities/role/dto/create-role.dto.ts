import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  name: string;
}