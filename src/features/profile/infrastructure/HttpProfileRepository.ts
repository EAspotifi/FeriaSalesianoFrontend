import type { HttpClient } from "../../../shared/utils/httpClient";
import type { UserProfile } from "../domain/entities/UserProfile";
import type { ProfileRepository } from "../domain/ports/ProfileRepository";

interface ProfileDto {
  id: string;
  username: string;
  nombre: string;
  correo: string;
}

export class HttpProfileRepository implements ProfileRepository {
  constructor(private readonly http: HttpClient) {}

  async getProfile(): Promise<UserProfile> {
    const dto = await this.http.get<ProfileDto>("/users/profile");
    return {
      id: dto.id,
      username: dto.username,
      nombre: dto.nombre,
      correo: dto.correo,
    };
  }
}
