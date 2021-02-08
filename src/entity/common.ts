import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Id, Status, Timestamp } from '../datatype';

export abstract class Common {
  @PrimaryGeneratedColumn(Id)
  id: number;

  @Column(Timestamp)
  create_time: number;

  @Column(Timestamp)
  update_time: number;

  @Column(Status())
  status: number;
}
