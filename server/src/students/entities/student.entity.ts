import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
import { User } from '../../users/entities/user.entity';
import { Version } from 'src/programs/entities/version.entity';
import { Branch } from 'src/programs/entities/branch.entity';

@Entity()
export class Student {
  @PrimaryColumn()
  userId: number;

  @OneToOne(() => User, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column()
  credits: number;

  @Column()
  generation: number;

  @Column('decimal', { precision: 6, scale: 2 })
  GPA: number;

  @ManyToOne(() => Project, (project) => project.students, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  project: Project;

  @Column({ nullable: true })
  enrolledAt: Date;

  @ManyToOne(() => Version)
  version: Version;

  @ManyToOne(() => Branch)
  branch: Branch;
}
