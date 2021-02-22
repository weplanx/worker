import { acl } from './framework/acl';
import { resource } from './framework/resource';
import { policy } from './framework/policy';
import { role } from './framework/role';
import { admin } from './framework/admin';
import { Connection } from 'typeorm';
import { permission } from './framework/permission';

export const bootstrap = async (connection: Connection, vars: any) => {
  await acl(vars);
  await resource(vars);
  await policy(vars);
  await permission(vars);
  await role(vars);
  await admin(vars);
};
