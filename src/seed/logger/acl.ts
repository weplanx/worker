import { EntityManager, getRepository } from 'typeorm';
import { Acl } from '@entity/framework/acl';

export async function acl(entityManager: EntityManager, vars: any) {
  await getRepository(Acl).insert([
    {
      key: 'request_log',
      name: { zh_cn: '访问日志', en_us: 'Request Log' },
      read: 'lists',
      create_time: vars.time,
      update_time: vars.time,
    },
    {
      key: 'login_log',
      name: { zh_cn: '登录日志', en_us: 'Login Log' },
      read: 'lists',
      create_time: vars.time,
      update_time: vars.time,
    },
  ]);
}
