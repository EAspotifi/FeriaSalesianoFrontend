import type { HttpClient } from "../../../shared/utils/httpClient";
import { buildQuery } from "../../../shared/types/PagedResult";
import type { UserSummary } from "../domain/entities/UserSummary";
import type { UserDirectory } from "../domain/ports/UserDirectory";

interface UserListItemDto {
  id: string;
  username: string;
  nombre: string;
  correo: string;
}

interface PagedUsersDto {
  items: UserListItemDto[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export class HttpUserDirectory implements UserDirectory {
  constructor(private readonly http: HttpClient) {}

  async searchUsers(query?: string): Promise<UserSummary[]> {
    const path = `/users${buildQuery({ search: query, page: 1, pageSize: 50 })}`;
    const dto = await this.http.get<PagedUsersDto>(path);
    return dto.items.map((item) => ({
      id: item.id,
      username: item.username,
      nombre: item.nombre,
      correo: item.correo,
    }));
  }
}
