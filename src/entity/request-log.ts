import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Id, Timestamp } from '@type';

@Entity()
export class RequestLog {
  @PrimaryGeneratedColumn(Id)
  id: number;

  @Column({ type: 'varchar', length: 200, comment: '请求路径' })
  path: string;

  @Column({ type: 'varchar', length: 200, comment: '控制器' })
  controller: string;

  @Column({ type: 'varchar', length: 200, comment: '函数入口' })
  action: string;

  @Column({ type: 'tinyint', unsigned: true, comment: '模式' })
  mode: number;

  @Column({ type: 'varchar', length: 50, comment: '用户名' })
  username: string;

  @Column({ type: 'json', comment: '请求内容' })
  body: object;

  @Column(Timestamp)
  time: number;
}