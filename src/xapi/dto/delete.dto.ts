import { IsObject } from 'class-validator';

export class DeleteDto {
  @IsObject()
  where: Record<string, any>;
}
