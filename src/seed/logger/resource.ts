import { EntityManager, getRepository } from 'typeorm';
import { Resource } from '@entity/framework/resource';

export async function resource(entityManager: EntityManager, vars: any) {
  await getRepository(Resource).insert([
    {
      key: 'logger',
      parent: 'system',
      name: { zh_cn: '日志审计', en_us: 'Log Audit' },
      nav: 1,
      router: 0,
      policy: 0,
      icon: null,
      create_time: vars.time,
      update_time: vars.time,
    },
    {
      key: 'request-log',
      parent: 'logger',
      name: { zh_cn: '访问日志', en_us: 'Request Log' },
      nav: 1,
      router: 1,
      policy: 1,
      icon: null,
      create_time: vars.time,
      update_time: vars.time,
    },
    {
      key: 'login-log',
      parent: 'logger',
      name: { zh_cn: '登录日志', en_us: 'Login Log' },
      nav: 1,
      router: 1,
      policy: 1,
      icon: null,
      create_time: vars.time,
      update_time: vars.time,
    },
  ]);
}
