import { Controller, Post } from '@nestjs/common';

@Controller('xapi/:collection')
export class XapiController {
  @Post('find')
  find(): any {
    return {};
  }

  @Post('find_by_page')
  findByPage(): any {
    return {};
  }

  @Post('find_one')
  findOne(): any {
    return {};
  }

  @Post('create')
  create(): any {
    return {};
  }

  @Post('update')
  update(): any {
    return {};
  }

  @Post('delete')
  delete(): any {
    return {};
  }
}
