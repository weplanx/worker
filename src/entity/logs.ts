import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Id, Timestamp } from '@type';

@Entity()
export class Logs {
  @PrimaryGeneratedColumn(Id)
  id: number;

  @Column({ type: 'varchar', length: 200, comment: '访问地址' })
  path: string;

  @Column({ type: 'varchar', length: 50, comment: '用户名' })
  username: string;

  @Column({ type: 'json', comment: '请求体' })
  body: object;

  @Column(Timestamp)
  time: number;
}
