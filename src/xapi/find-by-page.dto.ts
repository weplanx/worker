import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Sort } from 'mongodb';

import { Page } from './page';

export class FindByPageDto {
  @IsObject()
  @IsOptional()
  where: Record<string, any>;

  @IsObject()
  @IsOptional()
  sort: Sort;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Page)
  page: Page;
}
