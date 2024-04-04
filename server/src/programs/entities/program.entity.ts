import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Branch } from './branch.entity';
import { Faculty } from 'src/faculties/entities/faculty.entity';
import { Version } from './version.entity';

@Entity()
export class Program {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  major: string;

  @OneToMany(() => Version, (version) => version.program, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  versions: Version[];

  @ManyToOne(() => Faculty, { onDelete: 'CASCADE' })
  faculty: Faculty;
}
