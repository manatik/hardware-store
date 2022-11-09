import { IsBoolean, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { isTrue } from '@utils/utils';

export class FurnitureAllQuery {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => isTrue(value))
  deleted: boolean;
}
