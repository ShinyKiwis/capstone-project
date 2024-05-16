import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Criterion } from './criterion.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class AssessmentRecord {
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
  answer: string;

  @ManyToOne(() => User)
  user: User;
}
