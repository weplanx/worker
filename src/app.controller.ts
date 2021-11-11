import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { DatabaseService } from '@weplanx/database';

@Controller()
export class AppController {
  constructor(private db: DatabaseService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Req() req: any) {
    return req.user;
  }
}
