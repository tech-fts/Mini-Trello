import { User, RegisterUserInput } from "../entities/user";
import { UserRepository } from "../repositories/userRepository";
import { validateRegisterInput } from "./authValidators";
import { hashPassword } from "../../../shared/utils/password";

export async function registerUser(
  userRepository: UserRepository,
  input: RegisterUserInput,
): Promise<User> {
  validateRegisterInput(input);

  const existingUser = await userRepository.getByEmail(input.email);
  if (existingUser) {
    throw new Error("Email is already registered");
  }

  const passwordHash = hashPassword(input.password);

  return userRepository.create(input, passwordHash);
}
