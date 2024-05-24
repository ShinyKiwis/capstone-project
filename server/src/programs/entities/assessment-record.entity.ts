import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Criterion } from './criterion.entity';
import { User } from 'src/users/entities/user.entity';
import { Project } from 'src/projects/entities/project.entity';

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

  @ManyToOne(() => Project, { eager: true })
  project: Project;

  @Column()
  answer: string;

  @Column({ nullable: true })
  score: number;

  @ManyToOne(() => User, { eager: true })
  user: User;
}
