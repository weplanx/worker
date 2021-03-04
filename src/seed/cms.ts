import { acl } from './cms/acl';
import { resource } from './cms/resource';
import { policy } from './cms/policy';
import { Connection } from 'typeorm';

export const bootstrap = async (connection: Connection, vars: any) => {
  await connection.transaction(async entityManager => {
    await acl(entityManager, vars);
    await resource(entityManager, vars);
    await policy(entityManager, vars);
  });

};
