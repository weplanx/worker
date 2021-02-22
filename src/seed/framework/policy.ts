import { getRepository } from 'typeorm';
import { Policy } from '@entity/framework/policy';


export async function policy(vars: any) {
  await getRepository(Policy).insert([
    {
      resource_key: 'acl-index',
      acl_key: 'acl',
      policy: 1,
    },
    {
      resource_key: 'resource-index',
      acl_key: 'resource',
      policy: 1,
    },
    {
      resource_key: 'resource-index',
      acl_key: 'policy',
      policy: 1,
    },
    {
      resource_key: 'resource-index',
      acl_key: 'acl',
      policy: 0,
    },
    {
      resource_key: 'permission-index',
      acl_key: 'permission',
      policy: 1,
    },
    {
      resource_key: 'role-index',
      acl_key: 'role',
      policy: 1,
    },
    {
      resource_key: 'role-index',
      acl_key: 'resource',
      policy: 0,
    },
    {
      resource_key: 'admin-index',
      acl_key: 'admin',
      policy: 1,
    },
    {
      resource_key: 'admin-index',
      acl_key: 'role',
      policy: 0,
    },
    {
      resource_key: 'picture',
      acl_key: 'picture',
      policy: 1,
    },
    {
      resource_key: 'picture',
      acl_key: 'picture_type',
      policy: 1,
    },
    {
      resource_key: 'video',
      acl_key: 'video',
      policy: 1,
    },
    {
      resource_key: 'picture',
      acl_key: 'video_type',
      policy: 1,
    },
  ]);
}
