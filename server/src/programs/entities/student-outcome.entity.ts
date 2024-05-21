import { Version } from './version.entity';
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
    { eager: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  performanceIndicators: PerformanceIndicator[];

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 6, scale: 2, default: 0 })
  expectedGoal: number;

  @Column('decimal', { precision: 6, scale: 2, default: 0 })
  passingThreshold: number;
}
