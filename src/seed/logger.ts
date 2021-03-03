import { acl } from './logger/acl';
import { resource } from './logger/resource';
import { policy } from './logger/policy';
import { Connection, getRepository } from 'typeorm';
import { Resource } from '@entity/framework/resource';
import { RoleResourceRel } from '@entity/framework/role-resource-rel';

export const bootstrap = async (connection: Connection, vars: any) => {
  await acl(vars);
  await resource(vars);
  await policy(vars);

  await getRepository(RoleResourceRel).delete({
    role_key: '*',
  });
  const keys = await getRepository(Resource).find({
    select: ['key'],
  });
  await getRepository(RoleResourceRel).insert(
    keys.map(v => ({
      role_key: '*',
      resource_key: v.key,
    })),
  );
};
