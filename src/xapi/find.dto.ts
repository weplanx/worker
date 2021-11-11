import { IsDivisibleBy, IsNumber, IsObject, IsOptional } from 'class-validator';
import { Sort } from 'mongodb';

export class FindDto {
  @IsObject()
  @IsOptional()
  where: Record<string, any>;

  @IsObject()
  @IsOptional()
  sort: Sort;

  @IsNumber()
  @IsDivisibleBy(100)
  @IsOptional()
  next: number;
}
