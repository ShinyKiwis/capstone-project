import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Version } from "./version.entity";

@Entity()
export class ProgramEducationObjective {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  versionId: number;

  @PrimaryColumn()
  versionProgramId: number;

  @ManyToOne(() => Version, { onDelete: 'CASCADE' })
  version: Version;

  @Column()
  code: string;

  @Column()
  description: string;
}