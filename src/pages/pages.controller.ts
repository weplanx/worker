import { Controller, Get } from '@nestjs/common';

@Controller('pages')
export class PagesController {
  @Get('check_key/:key')
  async checkKey() {}
}
