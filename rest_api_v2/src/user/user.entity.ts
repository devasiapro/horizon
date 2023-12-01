import {
  BaseEntity,
  Entity,
  Column,
  JoinColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  username: string;

  @Column({ length: 256 })
  @Exclude()
  password: string;

  @Column({ length: 256, nullable: true })
  email: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;
}

