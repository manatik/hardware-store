import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsNumber()
  name: string;
}
