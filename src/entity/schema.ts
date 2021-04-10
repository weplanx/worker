import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Id, Status, Timestamp } from '@type';

@Entity()
export class Schema {
  @PrimaryGeneratedColumn(Id)
  id: number;

  @Column({ length: 200, unique: true, comment: '数据表' })
  table: string;

  @Column({ type: 'json', comment: '展示名称' })
  name: object;

  @Column({ type: 'tinyint', unsigned: true, comment: '模型类型' })
  type: number;

  @Column({ type: 'text', nullable: true, comment: '描述信息' })
  description: string;

  @Column(Status())
  status: number;

  @Column(Timestamp)
  create_time: number;

  @Column(Timestamp)
  update_time: number;
}