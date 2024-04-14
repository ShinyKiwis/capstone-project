import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Program } from './program.entity';
import { Semester } from 'src/semesters/entities/semester.entity';
import { StudentOutcome } from './student-outcome.entity';

@Entity()
export class Version {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  programId: number;

  @Column()
  name: string;

  @ManyToOne(() => Program, { onDelete: 'CASCADE' })
  program: Program;

  // @ManyToMany(() => Semester, { onDelete: 'SET NULL' })
  // @JoinTable()
  // semesters: Semester[];

  @Column()
  description: string;

  @OneToMany(() => StudentOutcome, (studentOutcome) => studentOutcome.version, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  studentOutcomes: StudentOutcome[];

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;
}
