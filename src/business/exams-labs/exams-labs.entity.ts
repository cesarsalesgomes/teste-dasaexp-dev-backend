import {
  Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column
} from 'typeorm';
import ExamsEntity from '../exams/exams.entity';
import LabsEntity from '../labs/labs.entity';

@Entity('exams_labs')
export class ExamsLabsEntity {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(
    () => ExamsEntity
  )
  @JoinColumn({
    name: 'examId',
    referencedColumnName: 'id'
  })
  exam: ExamsEntity

  @OneToOne(
    () => LabsEntity
  )
  @JoinColumn({
    name: 'labId',
    referencedColumnName: 'id'
  })
  lab: LabsEntity

  @Column()
  createdAt: Date

  @Column()
  updatedAt: Date

  @Column({ nullable: true })
  deletedAt: Date
}
