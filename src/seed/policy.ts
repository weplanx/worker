import { Policy } from '../entity/policy';
import { getRepository } from 'typeorm';


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
      resource_key: 'request-log',
      acl_key: 'request_log',
      policy: 1,
    },
    {
      resource_key: 'login-log',
      acl_key: 'login_log',
      policy: 1,
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
      resource_key: 'video',
      acl_key: 'video_type',
      policy: 1,
    },
    {
      resource_key: 'audio',
      acl_key: 'audio',
      policy: 1,
    },
    {
      resource_key: 'audio',
      acl_key: 'audio_type',
      policy: 1,
    },
    {
      resource_key: 'shop-index',
      acl_key: 'shop',
      policy: 1,
    },
    {
      resource_key: 'shop-index',
      acl_key: 'product',
      policy: 1,
    },
  ]);
}
