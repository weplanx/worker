import { Injectable } from '@nestjs/common';
import { Database } from '@common/database';

@Injectable()
export class PagesService {
  constructor(private db: Database) {}

  async checkKey(key: string) {
    const count = await this.db.collection('pages').countDocuments({
      'schema.key': key,
    });
    // this.db.listCollections()
  }
}
