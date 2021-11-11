import { Db, MongoClient } from 'mongodb';
import { Database, Query } from '@weplanx/database/types';
import { MongodbQuery } from './mongodb-query';

export class Mongodb implements Database {
  constructor(private client: MongoClient, private database: Db) {}

  collection<T>(name: string): Query<T> {
    return new MongodbQuery(
      this.client,
      this.database,
      this.database.collection<T>(name),
    );
  }
}
