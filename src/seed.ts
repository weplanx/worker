import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { acl } from './seed/acl';
import { resource } from './seed/resource';
import { policy } from './seed/policy';
import { permission } from './seed/permission';
import { role } from './seed/role';
import { admin } from './seed/admin';

createConnection().then(async connection => {
  const vars = {
    time: Math.floor(new Date().getTime() / 1000),
  };
  await acl(vars);
  await resource(vars);
  await policy(vars);
  await permission(vars);
  await role(vars);
  await admin(vars);
  await connection.close();
}).catch(error => console.log(error));
