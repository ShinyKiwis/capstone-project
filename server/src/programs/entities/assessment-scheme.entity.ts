import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Version } from './version.entity';
import { Semester } from '../../semesters/entities/semester.entity';

@Entity()
export class AssessmentScheme {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  versionId: number;

  @PrimaryColumn()
  versionProgramId: number;

  @Column()
  generation: string;

  @ManyToOne(() => Version, { onDelete: 'CASCADE' })
  version: Version;

  @ManyToOne(() => Semester, { onDelete: 'CASCADE' })
  semester: Semester;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;
}
