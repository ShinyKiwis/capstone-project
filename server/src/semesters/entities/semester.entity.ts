import { Project } from 'src/projects/entities/project.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Semester {
  @PrimaryColumn()
  year: number;

  @PrimaryColumn()
  no: number;

  @Column()
  start: Date;

  @Column()
  end: Date;

  // @OneToMany((type) => Project, (project) => project.semester)
  // projects: Project[];

  constructor(semester: Partial<Semester>) {
    Object.assign(this, semester);
  }
}
