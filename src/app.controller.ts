import { Controller, Get } from '@nestjs/common';

import { DatabaseService } from '@weplanx/database';

import { Order } from './data';

@Controller()
export class AppController {
  constructor(private db: DatabaseService) {}

  @Get()
  async index() {
    const data = await this.db
      .collection<Order>('order')
      .select({
        _id: 1,
        order_number: 1,
      })
      .sort({
        order_number: 1,
        service_number: 1,
      })
      .limit(10)
      .find((cursor) => cursor.allowDiskUse());
    return {
      data,
    };
  }
}
