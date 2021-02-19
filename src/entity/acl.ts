import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Id, Status, Timestamp } from '../datatype';

@Entity()
export class Acl {
  @PrimaryGeneratedColumn(Id)
  id: number;

  @Column({ length: 200, unique: true, comment: '访问控制代码' })
  key: string;

  @Column({ type: 'json', comment: '访问控制名称' })
  name: object;

  @Column({ type: 'longtext', nullable: true, comment: '写入控制项' })
  write: string;

  @Column({ type: 'longtext', nullable: true, comment: '读取控制项' })
  read: string;

  @Column(Timestamp)
  create_time: number;

  @Column(Timestamp)
  update_time: number;

  @Column(Status())
  status: number;
}
