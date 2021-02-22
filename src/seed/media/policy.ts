import { getRepository } from 'typeorm';
import { Policy } from '@entity/framework/policy';


export async function policy(vars: any) {
  await getRepository(Policy).insert([
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
