import { Common } from './common';
import { Column, Entity } from 'typeorm';

@Entity()
export class Video extends Common {
  @Column({ type: 'bigint', unsigned: true, default: 0, comment: '分类关联(0为未分类)' })
  type_id: number;

  @Column({ type: 'text', comment: '元素名称' })
  name: string;

  @Column({ type: 'text', comment: '元素路径' })
  url: string;
}
