import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Branch } from "./branch.entity";

@Entity()
export class Program {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  major: string;
}