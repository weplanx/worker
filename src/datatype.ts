import { PrimaryGeneratedColumnNumericOptions } from 'typeorm/decorator/options/PrimaryGeneratedColumnNumericOptions';
import { ColumnOptions } from 'typeorm';

export const Id: PrimaryGeneratedColumnNumericOptions = {
  type: 'bigint',
  unsigned: true,
};

export const Timestamp: ColumnOptions = {
  type: 'bigint',
  unsigned: true,
  default: 0,
};

export function Status(value = 1, comment?: string): ColumnOptions {
  return {
    type: 'tinyint',
    width: 1,
    unsigned: true,
    default: value,
    comment,
  };
}


