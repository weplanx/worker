import { IsBoolean, IsObject, IsOptional, IsString } from 'class-validator';

export class UpdateDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsObject()
  @IsOptional()
  where: Record<string, any>;

  @IsObject()
  update: Record<string, any>;

  @IsBoolean()
  @IsOptional()
  isMultiple: boolean;
}
