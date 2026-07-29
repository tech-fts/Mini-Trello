import { User, RegisterUserInput } from "../entities/user";
import { UserRepository } from "../repositories/userRepository";
import { validateRegisterInput } from "./authValidators";
import { hashPassword } from "../../../shared/utils/password";
import { DomainError } from "../../../shared/utils/http";

export async function registerUser(
  userRepository: UserRepository,
  input: RegisterUserInput,
): Promise<User> {
  validateRegisterInput(input);

  const existingUser = await userRepository.getByEmail(input.email);
  if (existingUser) {
    throw new DomainError("Email is already registered", 409);
  }

  const passwordHash = hashPassword(input.password);

  return userRepository.create(input, passwordHash);
}
