import { LoginUserInput, RegisterUserInput, User } from "../entities/user";

export interface UserRepository {
  getByEmail(email: string): Promise<User | null>;
  create(input: RegisterUserInput, passwordHash: string): Promise<User>;
}
