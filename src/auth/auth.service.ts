import { Injectable } from '@nestjs/common';

import { argon2Verify } from 'hash-wasm';

import { AdminService } from '../admin/admin.service';

@Injectable()
export class AuthService {
  constructor(private admin: AdminService) {}

  async validateUser(username: string, password: string) {
    const admin = await this.admin.getUsername(username);
    if (!admin) {
      return;
    }
    const isValid = await argon2Verify({
      password,
      hash: admin.password,
    });
    if (isValid) {
      delete admin.password;
      return admin;
    }
    return null;
  }
}
