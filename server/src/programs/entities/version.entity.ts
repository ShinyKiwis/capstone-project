import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Program } from './program.entity';

@Entity()
export class Version {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  programId: number;

  @Column()
  name: string;

  @ManyToOne(() => Program, { onDelete: 'CASCADE' })
  program: Program;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;
}
