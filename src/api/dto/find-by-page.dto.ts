import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Sort } from 'mongodb';

import { PageDto } from './page.dto';

export class FindByPageDto {
  @IsObject()
  @IsOptional()
  where: Record<string, any>;

  @IsArray()
  @IsOptional()
  sort: Sort;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PageDto)
  page: PageDto;
}
