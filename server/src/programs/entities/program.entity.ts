import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Major } from "./major.entity";
import { Branch } from "./branch.entity";

@Entity()
export class Program {
  @PrimaryGeneratedColumn()
  id: number;

  name: string;

  @ManyToOne(() => Major)
  major: Major;

  @ManyToOne(() => Branch)
  branch: Branch;
}