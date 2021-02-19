import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Id, Status, Timestamp } from '../datatype';

@Entity()
export class Role {
  @PrimaryGeneratedColumn(Id)
  id: number;

  @Column({ length: 200, unique: true, comment: '权限组代码' })
  key: string;

  @Column({ type: 'json', comment: '权限组名称' })
  name: object;

  @Column({ type: 'longtext', nullable: true, comment: '特殊授权' })
  permission: string;

  @Column({ type: 'text', nullable: true, comment: '备注' })
  note: string;

  @Column(Timestamp)
  create_time: number;

  @Column(Timestamp)
  update_time: number;

  @Column(Status())
  status: number;
}
