import { randomUUID } from "crypto";
import { User, RegisterUserInput } from "../../../domain/auth/entities/user";
import { UserRepository } from "../../../domain/auth/repositories/userRepository";

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async getByEmail(email: string): Promise<User | null> {
    const normalizedEmail = email.trim().toLowerCase();
    return this.users.find((user) => user.email === normalizedEmail) ?? null;
  }

  async create(input: RegisterUserInput, passwordHash: string): Promise<User> {
    const user: User = {
      id: randomUUID(),
      email: input.email.trim().toLowerCase(),
      passwordHash,
      createdAt: new Date().toISOString(),
    };

    this.users.push(user);
    return user;
  }
}
