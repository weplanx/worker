import { Column, Entity } from 'typeorm';
import { Common } from './common';

@Entity()
export class Role extends Common {
  @Column({ length: 200, unique: true, comment: '权限组代码' })
  key: string;

  @Column({ type: 'json', comment: '权限组名称' })
  name: object;

  @Column({ type: 'longtext', comment: '特殊授权' })
  permission: string;

  @Column({ type: 'text', comment: '备注' })
  note: string;
}
