import type { UserSummary } from "../entities/UserSummary";

export interface UserDirectory {
  searchUsers(query?: string): Promise<UserSummary[]>;
}
