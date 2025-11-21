import { UserRepository } from "../repositories/UserRepository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";

export class AuthService {
  static async register(name: string, email: string, password: string): Promise<{ user: Omit<User, "password">; token: string; }> {
    const existing = await UserRepository.findByEmail(email);
    if (existing) throw new Error("User with this email already exists");
    const hash = await bcrypt.hash(password, 10);
    const user = await UserRepository.create({ name, email, password: hash });
    const token = this.generateToken(user);
    const { password: _ignoredPassword, ...rest } = user as any;
    return { user: rest, token };
  }

  static async login(email: string, password: string): Promise<{ user: Omit<User, "password">; token: string; }> {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid credentials");
    const token = this.generateToken(user);
    const { password: _, ...rest } = user as any;
    return { user: rest, token };
  }

  private static generateToken(user: User) {
    const secret = process.env.JWT_SECRET || "secret";
    const expiresIn = process.env.JWT_EXPIRES_IN || "1h";
    return jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn });
  }
}