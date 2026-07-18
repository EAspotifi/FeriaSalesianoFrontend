import type { UserSummary } from "../domain/entities/UserSummary";
import type { UserDirectory } from "../domain/ports/UserDirectory";

export class SearchUsersUseCase {
  constructor(private readonly directory: UserDirectory) {}

  execute(query?: string): Promise<UserSummary[]> {
    return this.directory.searchUsers(query?.trim() || undefined);
  }
}
