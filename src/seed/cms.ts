import { acl } from './cms/acl';
import { resource } from './cms/resource';
import { policy } from './cms/policy';
import { Connection } from 'typeorm';

export const bootstrap = async (connection: Connection, vars: any) => {
  await acl(vars);
  await resource(vars);
  await policy(vars);
};
