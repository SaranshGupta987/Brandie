// src/entities/Post.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User)
  author: User;

  @Column("text")
  text: string;

  @Column({ nullable: true })
  mediaUrl?: string;

  @CreateDateColumn()
  createdAt: Date;
}