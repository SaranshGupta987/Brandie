// src/entities/User.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => User, (user) => user.following)
  @JoinTable({
    name: "user_followers",
    joinColumn: { name: "userId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "followerId", referencedColumnName: "id" },
  })
  followers: User[];

  @ManyToMany(() => User, (user) => user.followers)
  following: User[];
}