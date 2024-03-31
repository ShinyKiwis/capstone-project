import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Branch } from './branch.entity';
import { Faculty } from 'src/faculties/entities/faculty.entity';

@Entity()
export class Program {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  major: string;

  @ManyToOne(() => Faculty, {onDelete: 'CASCADE'})
  faculty: Faculty;
}
