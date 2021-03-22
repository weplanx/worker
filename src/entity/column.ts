import { Column as TypeColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Id, Status, Timestamp } from '@type';
import { Schema } from './schema';

@Entity()
@Unique(['schema', 'column'])
export class Column {
  @PrimaryGeneratedColumn(Id)
  id: number;

  @ManyToOne(() => Schema, value => value.table, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'schema', referencedColumnName: 'table' })
  schema: string;

  @TypeColumn({ length: 200, unique: true, comment: '数据表字段' })
  column: string;

  @TypeColumn({ length: 50, comment: '数据类型' })
  datatype: string;

  @TypeColumn({ type: 'json', comment: '展示名称' })
  name: object;

  @TypeColumn({ type: 'text', nullable: true, comment: '描述信息' })
  description: string;

  @TypeColumn({ type: 'tinyint', unsigned: true, default: 0, comment: '排序' })
  sort: number;

  @TypeColumn({ type: 'json', default: '{}', comment: '扩展字段' })
  extra: object;

  @TypeColumn(Status())
  status: number;

  @TypeColumn(Timestamp)
  create_time: number;

  @TypeColumn(Timestamp)
  update_time: number;
}