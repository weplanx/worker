import {
  DeleteResult,
  Document,
  Filter,
  FindCursor,
  FindOptions,
  InsertManyResult,
  InsertOneResult,
  OptionalId,
  Sort,
  UpdateFilter,
  UpdateResult,
} from 'mongodb';

export interface Database {
  collection<T>(name: string): Query<T>;
}

export interface Query<T> {
  find(callback?: (cursor: FindCursor<T>) => FindCursor<T>): Promise<T[]>;
  findOne(options?: FindOptions): Promise<T>;
  count(): Promise<number>;
  insertOne(doc: OptionalId<T>): Promise<InsertOneResult<T>>;
  insertMany(docs: OptionalId<T>[]): Promise<InsertManyResult<T>>;
  updateOne(update: UpdateFilter<T> | Partial<T>): Promise<UpdateResult>;
  updateMany(update: UpdateFilter<T>): Promise<UpdateResult | Document>;
  delete(): Promise<DeleteResult>;

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
