import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Id, Status, Timestamp } from '@type';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn(Id)
  id: number;

  @Column({ type: 'varchar', comment: '商铺名称' })
  name: string;

  @Column(Status())
  status: number;

  @Column(Timestamp)
  create_time: number;

  @Column(Timestamp)
  update_time: number;
}
