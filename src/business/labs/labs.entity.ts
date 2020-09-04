import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '@src/common/enums/Status';
import { States } from './labs.enum';

@Entity('labs')
export default class LabsEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  postcode: string

  @Column({
    type: 'enum',
    enum: States
  })
  state: States

  @Column()
  city: string

  @Column()
  street: string

  @Column()
  number: string

  @Column()
  neighborhood: string

  @Column({ nullable: true })
  additionalInfo: string

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
