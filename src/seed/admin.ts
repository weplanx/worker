import { getRepository } from 'typeorm';
import { argon2id } from 'hash-wasm';
import { randomBytes } from 'crypto';
import { Admin } from '../entity/admin';

export async function admin(vars: any) {
  await getRepository(Admin).insert([
    {
      username: 'super',
      password: await argon2id({
        password: 'pass@VAN1234',
        salt: randomBytes(16),
        parallelism: 1,
        iterations: 4,
        memorySize: 65536,
        hashLength: 32,
        outputType: 'encoded',
      }),
      call: 'kain',
      create_time: vars.time,
      update_time: vars.time,
    },
  ]);
}
