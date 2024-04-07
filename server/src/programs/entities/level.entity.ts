import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Criterion } from './criterion.entity';

@Entity()
export class Level {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  criterionId: number;

  @PrimaryColumn()
  criterionAssessmentSchemeId: number;

  @PrimaryColumn()
  criterionAssessmentSchemeVersionId: number;

  @PrimaryColumn()
  criterionAssessmentSchemeVersionProgramId: number;

  @ManyToOne(() => Criterion)
  criterion: Criterion;

  @Column()
  content: string;

  @Column()
  maxScore: number;

  @Column()
  minScore: number;
}
