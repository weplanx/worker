import { Body, Controller, Param, Post } from '@nestjs/common';
import { DeleteResult, Document, UpdateResult, WithId } from 'mongodb';

import { ApiService } from './api.service';
import { DeleteDto } from './dto/delete.dto';
import { FindByPageDto } from './dto/find-by-page.dto';
import { FindOneDto } from './dto/find-one.dto';
import { FindDto } from './dto/find.dto';
import { UpdateDto } from './dto/update.dto';

@Controller(':name')
export class ApiController {
  constructor(private api: ApiService) {}

  @Post('find')
  async find(@Param() param: any, @Body() body: FindDto) {
    let value: WithId<Document>[];
    if (body.id) {
      value = await this.api.findById(
        param.name,
        body.id,
        body.next,
        body.sort,
      );
    } else {
      value = await this.api.find(param.name, body.where, body.next, body.sort);
    }
    return {
      data: {
        value,
        next: (body.next ?? 0) + 100,
      },
    };
  }

  @Post('find_by_page')
  async findByPage(@Param() param: any, @Body() body: FindByPageDto) {
    const data = await this.api.findByPage(
      param.name,
      body.where,
      body.page,
      body.sort,
    );
    return {
      data,
    };
  }

  @Post('find_one')
  async findOne(@Param() param: any, @Body() body: FindOneDto) {
    let data: WithId<Document>;
    if (body.id) {
      data = await this.api.findOneById(param.name, body.id);
    } else {
      data = await this.api.findOne(param.name, body.where);
    }
    return {
      data,
    };
  }

  @Post('create')
  async create(@Param() param: any, @Body() body: any) {
    return await this.api.create(param.name, body);
  }

  @Post('update')
  async update(@Param() param: any, @Body() body: UpdateDto) {
    let data: UpdateResult;
    if (body.id) {
      data = await this.api.updateById(param.name, body.id, body.update);
    } else {
      data = await this.api.update(param.name, body.where, body.update);
    }
    return {
      data,
    };
  }

  @Post('delete')
  async delete(@Param() param: any, @Body() body: DeleteDto) {
    let data: DeleteResult;
    if (body.id) {
      data = await this.api.deleteById(param.name, body.id);
    } else {
      data = await this.api.delete(param.name, body.where);
    }
    return {
      data,
    };
  }
}
