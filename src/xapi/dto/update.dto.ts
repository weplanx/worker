import { IsBoolean, IsObject, IsOptional } from 'class-validator';

export class UpdateDto {
  @IsObject()
  where: Record<string, any>;

  @IsObject()
  update: Record<string, any>;

  @IsBoolean()
  @IsOptional()
  isMultiple: boolean;
}
