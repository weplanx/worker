import { IsIn, IsNumber, Min } from 'class-validator';

export class Page {
  @Min(1)
  @IsNumber()
  index: number;

  @IsIn([10, 20, 30, 40, 50])
  size: number;
}
