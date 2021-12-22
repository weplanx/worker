import { IsArray, IsObject, IsOptional } from 'class-validator';
import { Sort } from 'mongodb';

export class FindDto {
  @IsArray()
  @IsOptional()
  id: string[];

  @IsObject()
  @IsOptional()
  where: Record<string, any>;

  @IsObject()
  @IsOptional()
  sort: Sort;

  // @IsNumber()
  // @IsDivisibleBy(100)
  // @IsOptional()
  // next: number;
}
