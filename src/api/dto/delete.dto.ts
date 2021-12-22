import { IsArray, IsObject, IsOptional } from 'class-validator';

export class DeleteDto {
  @IsArray()
  @IsOptional()
  id: string[];

  @IsObject()
  @IsOptional()
  where: Record<string, any>;
}
