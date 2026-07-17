import type { UserProfile } from "../entities/UserProfile";

export interface ProfileRepository {
  getProfile(): Promise<UserProfile>;
}
