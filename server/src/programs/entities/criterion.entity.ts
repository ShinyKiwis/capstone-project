import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AssessmentScheme } from './assessment-scheme.entity';
import { PerformanceIndicator } from './performance-indicator.entity';

@Entity()
export class Criterion {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  assessmentSchemeId: number;

  @PrimaryColumn()
  assessmentSchemeVersionId: number;

  @PrimaryColumn()
  assessmentSchemeVersionProgramId: number;

  @ManyToOne(() => AssessmentScheme)
  assessmentScheme: AssessmentScheme;

  @Column()
  content: string;

  @ManyToOne(() => PerformanceIndicator)
  performanceIndicator: string;

  @Column('decimal', { precision: 6, scale: 2 })
  passingGoal: number;

  @Column('decimal', { precision: 6, scale: 2 })
  passingThreshold: number;
}
