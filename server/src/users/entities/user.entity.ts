import { Role } from 'src/roles/entities/role.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({unique: true, nullable: true})
  username: string;

  @Column({nullable: true})
  name: string;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];
}
