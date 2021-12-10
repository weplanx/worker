import { Body, Controller, Param, Post } from '@nestjs/common';

import { DatabaseService } from '@weplanx/database';

import { DeleteDto } from './dto/delete.dto';
import { FindByPageDto } from './dto/find-by-page.dto';
import { FindOneDto } from './dto/find-one.dto';
import { FindDto } from './dto/find.dto';
import { UpdateDto } from './dto/update.dto';

@Controller('xapi/:collection')
export class XapiController {
  constructor(private db: DatabaseService) {}

  @Post('find')
  async find(@Param() param: any, @Body() body: FindDto) {
    if (!body.next) {
      body.next = 0;
    }
    let query = this.db
      .collection(param.collection)
      .where(body.where)
      .skip(body.next)
      .limit(100);
    if (body.sort) {
      query = query.sort(body.sort);
    }
    const data = await query.find((cursor) => {
      if (Object(body.sort).length > 1) {
        cursor = cursor.allowDiskUse();
      }
      return cursor;
    });
    return {
      next: body.next + 100,
      data,
    };
  }

  @Post('find_by_page')
  async findByPage(@Param() param: any, @Body() body: FindByPageDto) {
    const name = param.collection;
    const countQuery = this.db.collection(name).where(body.where);
    let query = this.db.collection(name).where(body.where);
    if (body.sort) {
      query = query.sort(body.sort);
    }
    const total = await countQuery.count();
    const data = await query
      .limit(body.page.size)
      .skip((body.page.index - 1) * body.page.size)
      .find((cursor) => {
        if (Object(body.sort).length > 1) {
          cursor = cursor.allowDiskUse();
        }
        return cursor;
      });
    return {
      total,
      data,
    };
  }

  @Post('find_one')
  async findOne(@Param() param: any, @Body() body: FindOneDto) {
    return await this.db
      .collection(param.collection)
      .where(body.where)
      .findOne();
  }

  @Post('create')
  async create(@Param() param: any, @Body() body: any) {
    return await this.db.collection(param.collection).insertOne(body);
  }

  @Post('update')
  async update(@Param() param: any, @Body() body: UpdateDto) {
    const query = this.db.collection(param.collection).where(body.where);
    if (!body.isMultiple) {
      return await query.updateOne(body.update);
    } else {
      return await query.updateMany(body.update);
    }
  }

  @Post('delete')
  async delete(@Param() param: any, @Body() body: DeleteDto) {
    return await this.db
      .collection(param.collection)
      .where(body.where)
      .delete();
  }
}
