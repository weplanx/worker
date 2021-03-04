import { EntityManager, getRepository } from 'typeorm';
import { Acl } from '@entity/framework/acl';

export async function acl(entityManager: EntityManager, vars: any) {
  await entityManager.getRepository(Acl).insert([
    {
      key: 'picture_type',
      name: { zh_cn: '图片素材分类模块', en_us: 'Picture Type Module' },
      write: 'add,edit,delete,sort',
      read: 'originLists',
      create_time: vars.time,
      update_time: vars.time,
    },
    {
      key: 'picture',
      name: { zh_cn: '图片素材模块', en_us: 'Picture Module' },
      write: 'bulkAdd,edit,bulkEdit,delete',
      read: 'lists,count',
      create_time: vars.time,
      update_time: vars.time,
    },
    {
      key: 'video_type',
      name: { zh_cn: '视频素材分类模块', en_us: 'Video Type Module' },
      write: 'add,edit,delete,sort',
      read: 'originLists',
      create_time: vars.time,
      update_time: vars.time,
    },
    {
      key: 'video',
      name: { zh_cn: '视频素材模块', en_us: 'Video Module' },
      write: 'bulkAdd,edit,bulkEdit,delete',
      read: 'lists,count',
      create_time: vars.time,
      update_time: vars.time,
    },
  ]);
}
