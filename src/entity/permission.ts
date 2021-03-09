import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Id, Status, Timestamp } from '@datatype';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn(Id)
  id: number;

  @Column({ length: 200, unique: true, comment: '特殊授权代码' })
  key: string;

  @Column({ type: 'json', comment: '特殊授权名称' })
  name: object;

  @Column({ type: 'text', comment: '备注' })
  note: string;

  @Column(Status())
  status: number;

  @Column(Timestamp)
  create_time: number;

  @Column(Timestamp)
  update_time: number;
}
