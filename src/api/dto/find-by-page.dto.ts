import { Type } from 'class-transformer';
import {
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

  @IsObject()
  @IsOptional()
  sort: Sort;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PageDto)
  page: PageDto;
}
