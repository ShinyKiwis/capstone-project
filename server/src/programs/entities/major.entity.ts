import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Major {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  name: string;
}