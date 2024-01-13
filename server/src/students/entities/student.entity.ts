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

@Entity()
export class Student {
  @PrimaryColumn()
  userId: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  credits: number;

  @Column()
  generation: number;

  @Column('decimal', { precision: 6, scale: 2 })
  GPA: number;

  @ManyToOne(() => Project, (project) => project.students)
  @JoinColumn()
  project: Project;

  @Column({ nullable: true })
  enrolledAt: Date;
}
