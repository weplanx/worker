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
      value = await this.api.findById(param.name, body.id, body.sort);
    } else {
      value = await this.api.find(param.name, body.where, body.sort);
    }
    return {
      value,
    };
  }

  @Post('find_by_page')
  async findByPage(@Param() param: any, @Body() body: FindByPageDto) {
    return await this.api.findByPage(
      param.name,
      body.where,
      body.page,
      body.sort,
    );
  }

  @Post('find_one')
  async findOne(@Param() param: any, @Body() body: FindOneDto) {
    let value: WithId<Document>;
    if (body.id) {
      value = await this.api.findOneById(param.name, body.id);
    } else {
      value = await this.api.findOne(param.name, body.where);
    }
    return value;
  }

  @Post('create')
  async create(@Param() param: any, @Body() body: any) {
    return await this.api.create(param.name, body);
  }

  @Post('update')
  async update(@Param() param: any, @Body() body: UpdateDto) {
    let result: UpdateResult;
    if (body.id) {
      result = await this.api.updateById(param.name, body.id, body.update);
    } else {
      result = await this.api.update(param.name, body.where, body.update);
    }
    return result;
  }

  @Post('delete')
  async delete(@Param() param: any, @Body() body: DeleteDto) {
    let result: DeleteResult;
    if (body.id) {
      result = await this.api.deleteById(param.name, body.id);
    } else {
      result = await this.api.delete(param.name, body.where);
    }
    return result;
  }
}
