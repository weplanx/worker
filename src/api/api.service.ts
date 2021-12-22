import { Injectable } from '@nestjs/common';

import { Database } from '@common/database';
import { Filter, ObjectId, Sort, UpdateFilter } from 'mongodb';

@Injectable()
export class ApiService {
  constructor(private db: Database) {}

  async create(name: string, data: any) {
    data.create_time = new Date();
    data.update_time = new Date();
    return this.db.collection(name).insertOne(data);
  }

  async findOne<T>(name: string, filter: Filter<T>) {
    return this.db.collection<T>(name).findOne(filter);
  }

  async findOneById(name: string, id: string) {
    return this.findOne(name, {
      _id: new ObjectId(id),
    });
  }

  async find<T>(name: string, filter: Filter<T> = {}, sort?: Sort) {
    return this.db.collection(name).find(filter).sort(sort).toArray();
  }

  async findById(name: string, id: string[], sort?: Sort) {
    return this.find(name, {
      _id: { $in: id.map((v) => new ObjectId(v)) },
      sort,
    });
  }

  async findByPage<T>(name: string, filter: Filter<T>) {
    let total = 0;
    if (filter) {
      total = await this.db.collection(name).countDocuments(filter);
    } else {
      total = await this.db.collection(name).estimatedDocumentCount();
    }
    const value = await this.db.collection<T>(name).find(filter).toArray();
    return {
      total,
      value,
    };
  }

  async update<T>(
    name: string,
    filter: Filter<T>,
    update: UpdateFilter<T> | Partial<T>,
  ) {
    update['$set'].update_time = new Date();
    return this.db.collection<T>(name).updateOne(filter, update);
  }

  async updateById<T>(
    name: string,
    id: string,
    update: UpdateFilter<T> | Partial<T>,
  ) {
    return this.update<T>(name, { _id: new ObjectId(id) }, update);
  }

  async delete<T>(name: string, filter: Filter<T>) {
    return this.db.collection<T>(name).deleteMany(filter);
  }

  async deleteById(name: string, id: string[]) {
    return this.delete<any>(name, {
      _id: { $in: id.map((v) => new ObjectId(v)) },
    });
  }
}
