import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Id, Status, Timestamp } from '@type';

@Entity()
export class Audio {
  @PrimaryGeneratedColumn(Id)
  id: number;

  @Column({ type: 'bigint', unsigned: true, default: 0, comment: '分类关联(0为未分类)' })
  type_id: number;

  @Column({ type: 'text', comment: '元素名称' })
  name: string;

  @Column({ type: 'text', comment: '元素路径' })
  url: string;

  @Column(Timestamp)
  create_time: number;

  @Column(Timestamp)
  update_time: number;
}
