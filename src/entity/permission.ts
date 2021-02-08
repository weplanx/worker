import { Column, Entity } from 'typeorm';
import { Common } from './common';

@Entity()
export class Permission extends Common {
  @Column({ length: 200, unique: true, comment: '特殊授权代码' })
  key: string;

  @Column({ type: 'json', comment: '特殊授权名称' })
  name: object;

  @Column({ type: 'text', comment: '备注' })
  note: string;
}
