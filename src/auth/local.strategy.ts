import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-local';

import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private auth: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const data = await this.auth.validateUser(username, password);
    if (!data) {
      throw new UnauthorizedException();
    }
    return data;
  }
}
