import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Sort } from 'mongodb';

import { PageInterface } from '../interfaces/page.interface';

export class FindByPageDto {
  @IsObject()
  @IsOptional()
  where: Record<string, any>;

  @IsObject()
  @IsOptional()
  sort: Sort;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PageInterface)
  page: PageInterface;
}
