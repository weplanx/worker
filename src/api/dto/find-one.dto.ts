import { IsObject, IsOptional, IsString } from 'class-validator';

export class FindOneDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsObject()
  @IsOptional()
  where: Record<string, any>;
}
