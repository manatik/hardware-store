import { IsBoolean, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { isTrue } from 'common/utils/utils';

export class UserInfoQuery {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => isTrue(value))
  tokens: boolean | string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => isTrue(value))
  roles: boolean | string;
}
