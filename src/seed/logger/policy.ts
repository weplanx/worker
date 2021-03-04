import { EntityManager, getRepository } from 'typeorm';
import { Policy } from '@entity/framework/policy';


export async function policy(entityManager: EntityManager, vars: any) {
  await getRepository(Policy).insert([
    {
      resource_key: 'request-log',
      acl_key: 'request_log',
      policy: 1,
    },
    {
      resource_key: 'login-log',
      acl_key: 'login_log',
      policy: 1,
    },
  ]);
}
