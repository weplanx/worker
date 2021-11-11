import { IsObject, IsOptional } from 'class-validator';

export class FindOneDto {
  @IsObject()
  @IsOptional()
  where: Record<string, any>;
}
