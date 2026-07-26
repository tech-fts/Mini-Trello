export interface User {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export interface RegisterUserInput {
  email: string;
  password: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
}
