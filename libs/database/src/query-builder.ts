import { QueryOption } from '@weplanx/database/types';
import { Filter, Sort } from 'mongodb';

export class QueryBuilder<T> {
  protected option: QueryOption<T> = <QueryOption<T>>{};

  where(value: Filter<T>): this {
    this.option.filter = value;
    return this;
  }

  select(value: T): this {
    this.option.project = value;
    return this;
  }

  sort(value: Sort): this {
    this.option.sort = value;
    return this;
  }

  limit(value: number): this {
    this.option.limit = value;
    return this;
  }

  skip(value: number): this {
    this.option.skip = value;
    return this;
  }
}
