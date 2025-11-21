import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { Repository } from "typeorm";

export class UserRepository {
  private static repo(): Repository<User> {
    return AppDataSource.getRepository(User);
  }

  static async findAll(skip: number, take: number) {
    return this.repo().find({ skip, take, order: { createdAt: "DESC" } });
  }

  static async findById(id: string) {
    return this.repo().findOne({ where: { id } });
  }

  static async findByEmail(email: string) {
    return this.repo().findOne({ where: { email } });
  }

  static async create(user: Partial<User>): Promise<any> {
    const u = this.repo().create(user as any);
    return this.repo().save(u);
  }

  static async update(id: string, updates: Partial<User>) {
    await this.repo().update(id, updates);
    return this.findById(id);
  }

  static async delete(id: string) {
    await this.repo().delete(id);
  }
}