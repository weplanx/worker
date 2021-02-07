import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Status, Id, Timestamp } from './datatype';

export abstract class Common {
  @PrimaryGeneratedColumn(Id)
  id: number;

  @Column(Status())
  status: number;

  @Column(Timestamp)
  create_time: number;

  @Column(Timestamp)
  update_time: number;
}
