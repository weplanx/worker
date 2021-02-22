import { acl } from './media/acl';
import { resource } from './media/resource';
import { policy } from './media/policy';
import { Connection } from 'typeorm';

export const bootstrap = async (connection: Connection, vars: any) => {
  await acl(vars);
  await resource(vars);
  await policy(vars);
};
