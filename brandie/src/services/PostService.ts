// src/services/PostService.ts
import { In } from "typeorm";
import { AppDataSource } from "../data-source";
import { Post } from "../entities/Post";
import { User } from "../entities/User";

const postRepo = AppDataSource.getRepository(Post);
const userRepo = AppDataSource.getRepository(User);

export class PostService {
  static async create(authorId: string, text: string, mediaUrl?: string) {
    const author = await userRepo.findOne({ where: { id: authorId } });
    if (!author) throw new Error("Author not found.");

    const post = postRepo.create({ text, mediaUrl, author });
    return postRepo.save(post);
  }

  static async getFeed(userId: string, limit = 20, offset = 0) {
    const user = await userRepo.findOne({
      where: { id: userId },
      relations: ["following"],
    });
    if (!user) throw new Error("User not found.");

    const followingIds = user.following.map((u) => u.id);

    const [items, total] = await postRepo.findAndCount({
      where: { author: { id: In(followingIds) } },
      order: { createdAt: "DESC" },
      take: limit,
      skip: offset,
    });

    return { data: items, total };
  }

  static async getUserPosts(userId: string, limit = 20, offset = 0) {
    const [items, total] = await postRepo.findAndCount({
      where: { author: { id: userId } },
      order: { createdAt: "DESC" },
      take: limit,
      skip: offset,
    });

    return { data: items, total };
  }
}