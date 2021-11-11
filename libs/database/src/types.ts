import { Document, Filter, FindCursor, Sort } from 'mongodb';

export interface Database {
  collection<T>(name: string): Query<T>;
}

export interface Query<T> {
  find(callback?: (cursor: FindCursor<T>) => FindCursor<T>): Promise<T[]>;

  where(value: Filter<T>): this;
  select(value: Document): this;
  sort(value: Sort): this;
  skip(value: number): this;
  limit(value: number): this;
}

export interface QueryOption<T> {
  filter: Filter<T>;
  project: Document;
  sort: Sort;
  skip: number;
  limit: number;
}
