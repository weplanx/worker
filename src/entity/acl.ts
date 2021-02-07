import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Id, Boolean, Timestamp } from '../types';

@Entity()
export class Acl {
  @PrimaryGeneratedColumn(Id)
  id: number;

  @Column({ length: 200, unique: true, nullable: false, comment: '访问控制代码' })
  key: string;

  @Column({ type: 'json', nullable: false, comment: '访问控制名称' })
  name: any;

  @Column({ type: 'longtext', nullable: true, comment: '写入控制项' })
  write: string;

  @Column({ type: 'longtext', nullable: true, comment: '读取控制项' })
  read: string;

  @Column(Boolean())
  status: number;

  @Column(Timestamp)
  create_time: number;

  @Column(Timestamp)
  update_time: number;
}
