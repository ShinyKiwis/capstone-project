import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AssessmentScheme } from './assessment-scheme.entity';

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

  @Column('decimal', { precision: 6, scale: 2 })
  passingGoal: number;

  @Column('decimal', { precision: 6, scale: 2 })
  passingThreshold: number;
}
