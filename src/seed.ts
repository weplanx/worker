import { createConnection } from 'typeorm';
import { acl } from './seed/acl';
import { resource } from './seed/resource';
import { policy } from './seed/policy';
import { permission } from './seed/permission';
import { role } from './seed/role';
import { admin } from './seed/admin';

createConnection().then(async connection => {
  await connection.transaction(async entityManager => {
    const args = [
      entityManager,
      {
        time: Math.floor(new Date().getTime() / 1000),
      },
    ];
    const tasks = [
      acl, resource, policy, permission, role, admin,
    ];
    for (const task of tasks) {
      await Reflect.apply(task, undefined, args);
    }
  });
  await connection.close();
});