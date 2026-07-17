import type { UserProfile } from "../domain/entities/UserProfile";
import type { ProfileRepository } from "../domain/ports/ProfileRepository";

export class GetProfileUseCase {
  constructor(private readonly repository: ProfileRepository) {}

  execute(): Promise<UserProfile> {
    return this.repository.getProfile();
  }
}
