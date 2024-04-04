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
import { Branch } from '../../programs/entities/branch.entity';
import { Student } from '../../students/entities/student.entity';
import { Registration } from 'src/registrations/entities/registration.entity';
import { Program } from 'src/programs/entities/program.entity';

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

  @ManyToOne(() => Registration, { onDelete: 'CASCADE' })
  registration: Registration;

  @OneToMany(() => Requirement, (requirement) => requirement.project, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  requirements: Requirement[];

  @ManyToMany(() => User, { eager: true, onUpdate: 'CASCADE' })
  @JoinTable()
  supervisors: User[];

  @OneToMany(() => Student, (student) => student.project, {
    eager: true,
    onUpdate: 'CASCADE',
  })
  students: Student[];

  @ManyToMany(() => Program, {
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable()
  programs: Program[];

  @ManyToMany(() => Branch, {
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable()
  branches: Branch[];

  @ManyToOne(() => User, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  owner: User;

  @ManyToOne(() => User, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  programChair: User;

  @Column({ nullable: true })
  programChairApprovedAt: Date;

  @ManyToOne(() => User, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  departmentHead: User;

  @Column({ nullable: true })
  departmentHeadApprovedAt: Date;

  @ManyToOne(() => User, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  rejectedBy: User;

  @Column({ nullable: true })
  rejectedReason: string;

  @Column()
  limit: number;
}
