import { Role } from '../../roles/entities/role.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  name: string;

  @ManyToMany(() => Role, { eager: true, onDelete: 'SET NULL'})
  @JoinTable()
  roles: Role[];
}
