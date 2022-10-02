import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserRoleDto {
  @IsNotEmpty()
  @IsNumber()
  roleId: number;
}
