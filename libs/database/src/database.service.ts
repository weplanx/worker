import { Inject, Injectable } from '@nestjs/common';

import { Database, Query } from '@weplanx/database/types';

@Injectable()
export class DatabaseService {
  constructor(@Inject('DATABASE') private database: Database) {}

  collection<T>(name: string): Query<T> {
    return this.database.collection<T>(name);
  }
}
