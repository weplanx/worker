import { Query } from '@weplanx/database/types';
import { Collection, Db, FindCursor, MongoClient } from 'mongodb';
import { QueryBuilder } from '@weplanx/database/query-builder';

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
}
