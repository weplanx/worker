import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Id, Status, Timestamp } from '@datatype';

@Entity()
export class VideoType {
  @PrimaryGeneratedColumn(Id)
  id: number;

  @Column({ length: 50, comment: '类型名称' })
  name: string;

  @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '排序' })
  sort: number;

  @Column(Timestamp)
  create_time: number;

  @Column(Timestamp)
  update_time: number;

  @Column(Status())
  status: number;
}
