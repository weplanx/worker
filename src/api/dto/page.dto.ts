import { IsIn, IsNumber, Min } from 'class-validator';

export class PageDto {
  @Min(1)
  @IsNumber()
  index: number;

  @IsIn([10, 20, 30, 40, 50])
  size: number;
}
