// src/services/FollowService.ts
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

const userRepo = AppDataSource.getRepository(User);

export class FollowService {
  static async follow(currentUserId: string, targetUserId: string) {
    if (currentUserId === targetUserId) {
      throw new Error("You cannot follow yourself.");
    }

    const [currentUser, targetUser] = await Promise.all([
      userRepo.findOne({ where: { id: currentUserId }, relations: ["following"] }),
      userRepo.findOne({ where: { id: targetUserId } }),
    ]);

    if (!targetUser || !currentUser) {
      throw new Error("User not found.");
    }

    if (currentUser.following.some((u) => u.id === targetUserId)) {
      throw new Error("Already following.");
    }

    currentUser.following.push(targetUser);
    await userRepo.save(currentUser);

    return { message: `Followed ${targetUser.name}` }
  }

  static async unfollow(currentUserId: string, targetUserId: string) {
    const currentUser = await userRepo.findOne({
      where: { id: currentUserId },
      relations: ["following"],
    });

    if (!currentUser) throw new Error("User not found.");

    currentUser.following = currentUser.following.filter((u) => u.id !== targetUserId);
    await userRepo.save(currentUser);

    return { message: `Unfollowed.` }
  }

  static async getFollowers(userId: string, limit = 20, offset = 0) {
    const user = await userRepo.findOne({
      where: { id: userId },
      relations: ["followers"],
    });

    if (!user) throw new Error("User not found.");
    const items = user.followers.slice(offset, offset + limit);
    return { data: items, total: user.followers.length };
  }

  static async getFollowing(userId: string, limit = 20, offset = 0) {
    const user = await userRepo.findOne({
      where: { id: userId },
      relations: ["following"],
    });

    if (!user) throw new Error("User not found.");
    const items = user.following.slice(offset, offset + limit);
    return { data: items, total: user.following.length };
  }
}