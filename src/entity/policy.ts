import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Boolean, Id } from '../types';
import { Resource } from './resource';
import { Acl } from './acl';

@Entity()
export class Policy {
  @PrimaryGeneratedColumn(Id)
  id: number;

  @OneToOne(() => Resource, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'resource_key', referencedColumnName: 'key' })
  resource_key: string;

  @OneToOne(() => Acl, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'acl_key', referencedColumnName: 'key' })
  acl_key: string;

  @Column(Boolean(0, '读写策略（0为只读,1为读写）'))
  policy: number;
}
