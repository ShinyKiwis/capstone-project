import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Version } from './version.entity';
import { Semester } from '../../semesters/entities/semester.entity';
import { Criterion } from './criterion.entity';
import { AssessmentSchemeToPerformanceIndicator } from './assessment-scheme-to-performance-indicator.entity';

@Entity()
export class AssessmentScheme {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  versionId: number;

  @PrimaryColumn()
  versionProgramId: number;

  @Column({nullable: true})
  generation: string;

  @ManyToOne(() => Version, { onDelete: 'CASCADE' })
  version: Version;

  @ManyToOne(() => Semester, { onDelete: 'CASCADE', eager: true })
  semester: Semester;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Criterion, (criterion) => criterion.assessmentScheme)
  criteria: Criterion[];

  @OneToMany(() => AssessmentSchemeToPerformanceIndicator, (assessmentSchemeToPerformanceIndicator) => assessmentSchemeToPerformanceIndicator.assessmentScheme)
  performanceIndicators: AssessmentSchemeToPerformanceIndicator[];
}
