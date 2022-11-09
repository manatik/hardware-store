import { IsBoolean, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { isTrue } from '@utils/utils';

export class DeleteFurnitureQuery {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => isTrue(value))
  hard: boolean | string;
}
