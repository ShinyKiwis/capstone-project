import { Semester } from '../../semesters/entities/semester.entity';
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
import { User } from '../../users/entities/user.entity';
import { Major } from '../../programs/entities/major.entity';
import { Branch } from '../../programs/entities/branch.entity';
import { Student } from '../../students/entities/student.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  code: number;

  @Column()
  name: string;

  @Column()
  stage: number;

  @Column()
  description: string;

  @Column()
  tasks: string;

  @Column()
  references: string;

  @Column()
  status: ProjectStatus;

  @ManyToOne(() => Semester)
  semester: Semester;

  @OneToMany(() => Requirement, (requirement) => requirement.project)
  requirements: Requirement[];

  @ManyToMany(() => User, { eager: true, onUpdate: 'CASCADE' })
  @JoinTable()
  supervisors: User[];

  @OneToMany(() => Student, (student) => student.project, {
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  students: Student[];

  @ManyToMany(() => Major, { eager: true, onUpdate: 'CASCADE' })
  @JoinTable()
  majors: Major[];

  @ManyToMany(() => Branch, { eager: true, onUpdate: 'CASCADE' })
  @JoinTable()
  branches: Branch[];

  @ManyToOne(() => User)
  owner: User;

  @ManyToOne(() => User)
  programChair: User;

  @Column({ nullable: true })
  programChairApprovedAt: Date;

  @ManyToOne(() => User)
  departmentHead: User;

  @Column({ nullable: true })
  departmentHeadApprovedAt: Date;

  @ManyToOne(() => User)
  rejectedBy: User;

  @Column({ nullable: true })
  rejectedReason: string;

  @Column()
  limit: number;
}
