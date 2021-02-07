import { Column, Entity } from 'typeorm';
import { Common } from '../common';

@Entity()
export class Acl extends Common {
  @Column({ length: 200, nullable: false, unique: true, comment: '访问控制代码' })
  key: string;

  @Column({ type: 'json', nullable: false, comment: '访问控制名称' })
  name: object;

  @Column({ type: 'longtext', nullable: true, comment: '写入控制项' })
  write: string;

  @Column({ type: 'longtext', nullable: true, comment: '读取控制项' })
  read: string;
}
