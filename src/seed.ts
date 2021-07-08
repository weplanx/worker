import { createConnection } from 'typeorm';
import { acl } from './seed/acl';
import { resource } from './seed/resource';
import { policy } from './seed/policy';
import { permission } from './seed/permission';
import { role } from './seed/role';
import { admin } from './seed/admin';

createConnection().then(async connection => {
  const tasks = [
    acl, resource, policy, permission, role, admin,
  ];
  const vars = {
    time: Math.floor(new Date().getTime() / 1000),
  };
  for (const task of tasks) {
    await task(vars);
  }
  await connection.close();
});