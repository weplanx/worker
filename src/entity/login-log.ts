import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Id, Status, Timestamp } from '@type';

@Entity()
export class LoginLog {
  @PrimaryGeneratedColumn(Id)
  id: number;

  @Column({ type: 'varchar', length: 50, comment: '登录用户名' })
  username: string;

  @Column({ type: 'text', nullable: true, comment: '失败密码记录' })
  password: string;

  @Column({ type: 'varchar', length: 200, comment: '网络地址' })
  ip: string;

  @Column({ type: 'json', comment: 'ISP信息' })
  isp: object;

  @Column(Status(0, '已登录'))
  logged: number;

  @Column({ type: 'text', nullable: true, comment: '风险内容' })
  note: object;

  @Column(Timestamp)
  time: number;
}