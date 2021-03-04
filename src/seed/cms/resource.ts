import { EntityManager } from 'typeorm';
import { Resource } from '@entity/framework/resource';

export async function resource(entityManager: EntityManager, vars: any) {
  await entityManager.getRepository(Resource).insert([
    {
      key: 'cms',
      parent: 'origin',
      name: { zh_cn: '内容管理', en_us: 'CMS' },
      nav: 1,
      router: 0,
      policy: 0,
      icon: 'table',
      create_time: vars.time,
      update_time: vars.time,
    },
    {
      key: 'media',
      parent: 'cms',
      name: { zh_cn: '多媒体管理', en_us: 'Media' },
      nav: 1,
      router: 0,
      policy: 0,
      icon: null,
      create_time: vars.time,
      update_time: vars.time,
    },
    {
      key: 'picture',
      parent: 'media',
      name: { zh_cn: '图片素材', en_us: 'Picture' },
      nav: 1,
      router: 1,
      policy: 1,
      icon: null,
      create_time: vars.time,
      update_time: vars.time,
    },
    {
      key: 'video',
      parent: 'media',
      name: { zh_cn: '视频素材', en_us: 'Video' },
      nav: 1,
      router: 1,
      policy: 1,
      icon: null,
      create_time: vars.time,
      update_time: vars.time,
    },
  ]);
}
