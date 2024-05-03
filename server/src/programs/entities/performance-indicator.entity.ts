import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StudentOutcome } from './student-outcome.entity';

@Entity()
export class PerformanceIndicator {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  studentOutcomeId: number;

  @PrimaryColumn()
  studentOutcomeVersionId: number;

  @PrimaryColumn()
  studentOutcomeVersionProgramId: number;

  @ManyToOne(() => StudentOutcome, { onDelete: 'CASCADE'})
  studentOutcome: StudentOutcome;

  @Column()
  name: string;

  @Column()
  description: string;

  // @Column('decimal', { precision: 6, scale: 2, default: 0 })
  // expectedGoal: number;

  // @Column('decimal', { precision: 6, scale: 2, default: 0 })
  // passingThreshold: number;
}
