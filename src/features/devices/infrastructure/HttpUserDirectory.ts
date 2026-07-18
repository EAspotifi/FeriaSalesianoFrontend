import type { HttpClient } from "../../../shared/utils/httpClient";
import type { UserSummary } from "../domain/entities/UserSummary";
import type { UserDirectory } from "../domain/ports/UserDirectory";

interface UserListItemDto {
  id: string;
  username: string;
  nombre: string;
  correo: string;
}

export class HttpUserDirectory implements UserDirectory {
  constructor(private readonly http: HttpClient) {}

  async searchUsers(query?: string): Promise<UserSummary[]> {
    const path = query ? `/users?search=${encodeURIComponent(query)}` : "/users";
    const dtos = await this.http.get<UserListItemDto[]>(path);
    return dtos.map((dto) => ({
      id: dto.id,
      username: dto.username,
      nombre: dto.nombre,
      correo: dto.correo,
    }));
  }
}
