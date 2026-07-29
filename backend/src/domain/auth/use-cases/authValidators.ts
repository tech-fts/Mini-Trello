import { LoginUserInput, RegisterUserInput } from "../entities/user";
import { DomainError } from "../../../shared/utils/http";

export function validateEmail(email: string): void {
  const normalized = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!normalized || !emailRegex.test(normalized)) {
    throw new DomainError("Valid email is required");
  }
}

export function validatePassword(password: string): void {
  if (!password || typeof password !== "string" || password.length < 6) {
    throw new DomainError("Password must be at least 6 characters");
  }
}

export function validateRegisterInput(input: RegisterUserInput): void {
  if (!input || typeof input !== "object") {
    throw new DomainError("Invalid register input");
  }

  validateEmail(input.email);
  validatePassword(input.password);
}

export function validateLoginInput(input: LoginUserInput): void {
  if (!input || typeof input !== "object") {
    throw new DomainError("Invalid login input");
  }

  validateEmail(input.email);
  validatePassword(input.password);
}
