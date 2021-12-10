import { QueryBuilder } from '@weplanx/database/query-builder';
import { Query } from '@weplanx/database/types';
import {
  Collection,
  Db,
  DeleteResult,
  FindCursor,
  FindOptions,
  InsertManyResult,
  InsertOneResult,
  MongoClient,
  OptionalId,
  UpdateFilter,
  UpdateResult,
} from 'mongodb';

export class MongodbQuery<T> extends QueryBuilder<T> implements Query<T> {
  constructor(
    private client: MongoClient,
    private database: Db,
    private collection: Collection<T>,
  ) {
    super();
  }

  find(callback?: (cursor: FindCursor<T>) => FindCursor<T>): Promise<T[]> {
    let cursor = this.collection
      .find(this.option.filter ?? {})
      .project<T>(this.option.project ?? {})
      .sort(this.option.sort ?? {})
      .skip(this.option.skip ?? 0)
      .limit(this.option.limit ?? 0);
    if (callback) {
      cursor = callback(cursor);
    }
    return cursor.toArray();
  }

  findOne(options?: FindOptions): Promise<T> {
    return this.collection.findOne(this.option.filter ?? {}, options);
  }

  count(): Promise<number> {
    if (this.option.filter) {
      return this.collection.find().count();
    } else {
      return this.collection.estimatedDocumentCount();
    }
  }

  insertOne(doc: OptionalId<T>): Promise<InsertOneResult<T>> {
    return this.collection.insertOne(doc);
  }

  insertMany(docs: OptionalId<T>[]): Promise<InsertManyResult<T>> {
    return this.collection.insertMany(docs);
  }

  updateOne(update: UpdateFilter<T> | Partial<T>): Promise<UpdateResult> {
    return this.collection.updateOne(this.option.filter, update);
  }

  updateMany(update: UpdateFilter<T>): Promise<UpdateResult | Document> {
    return this.collection.updateMany(this.option.filter, update) as Promise<
      UpdateResult | Document
    >;
  }

  delete(): Promise<DeleteResult> {
    return this.collection.deleteMany(this.option.filter);
  }
}
