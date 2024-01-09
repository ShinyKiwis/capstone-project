import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  name: string;
}