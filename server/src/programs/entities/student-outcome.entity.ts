import { Version } from 'src/programs/entities/version.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PerformanceIndicator } from './performance-indicator.entity';

@Entity()
export class StudentOutcome {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  versionId: number;

  @PrimaryColumn()
  versionProgramId: number;

  @ManyToOne(() => Version, { onDelete: 'CASCADE' })
  version: Version;

  @OneToMany(
    () => PerformanceIndicator,
    (performanceIndicator) => performanceIndicator.studentOutcome,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  performanceIndicators: PerformanceIndicator[];

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 6, scale: 2 })
  expectedGoal: number;

  @Column('decimal', { precision: 6, scale: 2 })
  passingThreshold: number;
}