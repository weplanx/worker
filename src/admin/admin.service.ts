import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@weplanx/database';

import { Admin } from './admin';

@Injectable()
export class AdminService {
  constructor(private db: DatabaseService) {}

  getUsername(username: string) {
    return this.db
      .collection<Admin>('admin')
      .where({
        username,
      })
      .findOne();
  }
}
