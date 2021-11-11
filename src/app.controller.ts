import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { FastifyReply, FastifyRequest } from 'fastify';

import { Cookies } from '../common/decorators';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private auth: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('xapi/login')
  async login(
    @Req() req: FastifyRequest,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    const token = this.auth.createToken(req['user']);
    res.setCookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
  }

  @Get()
  index(@Cookies('name') name: string) {
    return { name };
  }

  @Get('setting')
  setting(@Res({ passthrough: true }) res: FastifyReply) {
    res.setCookie('name', 'kain', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    return {};
  }
}
