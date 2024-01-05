import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class Requirement {
  @PrimaryColumn()
  projectCode: number;

  @ManyToOne(() => Project, (project) => project.requirements)
  project: Project;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  attribute: string;

  @Column()
  operator: string;

  @Column()
  value: string;
}
