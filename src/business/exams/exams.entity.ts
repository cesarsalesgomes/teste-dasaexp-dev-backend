import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '@src/common/enums/Status';
import { ExamsType } from './exams.enum';

@Entity('exams')
export default class ExamsEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({
    type: 'enum',
    enum: ExamsType
  })
  type: ExamsType

  @Column({
    type: 'enum',
    enum: Status
  })
  status: Status

  @Column()
  createdAt: Date

  @Column()
  updatedAt: Date

  @Column({ nullable: true })
  deletedAt: Date
}
