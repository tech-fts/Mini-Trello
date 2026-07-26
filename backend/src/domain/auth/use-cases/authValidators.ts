import { LoginUserInput, RegisterUserInput } from "../entities/user";

export function validateEmail(email: string): void {
  const normalized = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!normalized || !emailRegex.test(normalized)) {
    throw new Error("Valid email is required");
  }
}

export function validatePassword(password: string): void {
  if (!password || typeof password !== "string" || password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }
}

export function validateRegisterInput(input: RegisterUserInput): void {
  if (!input || typeof input !== "object") {
    throw new Error("Invalid register input");
  }

  validateEmail(input.email);
  validatePassword(input.password);
}

export function validateLoginInput(input: LoginUserInput): void {
  if (!input || typeof input !== "object") {
    throw new Error("Invalid login input");
  }

  validateEmail(input.email);
  validatePassword(input.password);
}
