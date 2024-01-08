import { Semester } from 'src/semesters/entities/semester.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectStatus } from '../project-status.enum';
import { Requirement } from './requirement.entity';
import { User } from 'src/users/entities/user.entity';
import { Student } from 'src/users/entities/student.entity';
import { Major } from 'src/programs/entities/major.entity';
import { Branch } from 'src/programs/entities/branch.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  code: number;

  @Column()
  name: string;

  @Column()
  stage: number;

  @Column()
  detail: string;

  @Column()
  status: ProjectStatus;

  @ManyToOne(() => Semester)
  semester: Semester;

  @OneToMany(() => Requirement, (requirement) => requirement.project)
  requirements: Requirement[];

  @ManyToMany(() => User)
  @JoinTable()
  supervisors: User[];

  @OneToMany(() => Student, (student) => student.project)
  students: Student[];

  @ManyToMany(() => Major)
  @JoinTable()
  majors: Major[]

  @ManyToMany(() => Branch)
  @JoinTable()
  branches: Branch[]

  @Column()
  limit: number;

  constructor(project: Partial<Project>) {
    Object.assign(this, project);
  }
}
