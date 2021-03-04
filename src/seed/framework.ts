import { acl } from './framework/acl';
import { resource } from './framework/resource';
import { policy } from './framework/policy';
import { role } from './framework/role';
import { admin } from './framework/admin';
import { Connection } from 'typeorm';
import { permission } from './framework/permission';

export const bootstrap = async (connection: Connection, vars: any) => {
  await connection.transaction(async entityManager => {
    await acl(entityManager, vars);
    await resource(entityManager, vars);
    await policy(entityManager, vars);
    await permission(entityManager, vars);
    await role(entityManager, vars);
    await admin(entityManager, vars);
  });
};
