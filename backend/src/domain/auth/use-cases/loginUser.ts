import { LoginUserInput, User } from "../entities/user";
import { UserRepository } from "../repositories/userRepository";
import { validateLoginInput } from "./authValidators";
import { verifyPassword } from "../../../shared/utils/password";

export async function loginUser(
  userRepository: UserRepository,
  input: LoginUserInput,
): Promise<User> {
  validateLoginInput(input);

  const existingUser = await userRepository.getByEmail(input.email);
  if (!existingUser) {
    throw new Error("Invalid credentials");
  }

  const isValid = verifyPassword(input.password, existingUser.passwordHash);
  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  return existingUser;
}
