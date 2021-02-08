import { Common } from './common';
import { Column, Entity } from 'typeorm';

@Entity()
export class VideoType extends Common {
  @Column({ length: 50, comment: '类型名称' })
  name: string;

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '排序' })
  sort: number;
}
