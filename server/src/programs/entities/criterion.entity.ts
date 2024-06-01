import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AssessmentScheme } from './assessment-scheme.entity';
import { PerformanceIndicator } from './performance-indicator.entity';
import { Level } from './level.entity';
import { AssessmentRecord } from './assessment-record.entity';

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

  @ManyToOne(() => AssessmentScheme, {onDelete: 'CASCADE'})
  assessmentScheme: AssessmentScheme;

  @Column({nullable: true})
  type: string;

  @Column()
  content: string;

  @ManyToOne(() => PerformanceIndicator, { eager: true })
  performanceIndicator: PerformanceIndicator;

  @OneToMany(() => Level, (level) => level.criterion, {
    eager: true
  })
  levels: Level[];

  @OneToMany(() => AssessmentRecord, (assessmentRecord) => assessmentRecord.criterion, { eager: true })
  records: AssessmentRecord[];

  @Column('decimal', { precision: 6, scale: 2 })
  passingGoal: number;

  @Column('decimal', { precision: 6, scale: 2 })
  passingThreshold: number;
}
