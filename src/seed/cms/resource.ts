import { getRepository } from 'typeorm';
import { Resource } from '@entity/framework/resource';

export async function resource(vars: any) {
  await getRepository(Resource).insert([
    {
      key: 'media',
      parent: 'origin',
      name: { zh_cn: '多媒体管理', en_us: 'Media' },
      nav: 1,
      router: 0,
      policy: 0,
      icon: 'play-circle',
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
