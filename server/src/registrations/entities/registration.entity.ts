import { Semester } from 'src/semesters/entities/semester.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Registration {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  semesterYear: number;

  @PrimaryColumn()
  semesterNo: number;

  @ManyToOne(() => Semester)
  semester: Semester;

  @Column({nullable: true})
  name: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;
}
