import type { User } from "./User";

export interface AuthSession {
  readonly user: User;
  readonly token: string;
  readonly refreshToken: string;
}
