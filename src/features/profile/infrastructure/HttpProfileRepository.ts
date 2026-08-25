import type { HttpClient } from "../../../shared/utils/httpClient";
import type { MedicReportResult } from "../domain/entities/MedicReportResult";
import type { UserProfile } from "../domain/entities/UserProfile";
import type { ProfileRepository } from "../domain/ports/ProfileRepository";

interface ProfileDto {
  id: string;
  username: string;
  nombre: string;
  correo: string;
  birth?: string | null;
}

interface MedicReportResponseDto {
  correosEnviados: number;
  correosOmitidos: number;
  mesesIncluidos: number;
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
      birth: dto.birth ?? null,
    };
  }

  async sendMedicReport(enviarFamiliares: boolean): Promise<MedicReportResult> {
    const dto = await this.http.post<MedicReportResponseDto>("/users/profile/medic-report", {
      enviarFamiliares,
    });
    return {
      correosEnviados: dto.correosEnviados,
      correosOmitidos: dto.correosOmitidos,
      mesesIncluidos: dto.mesesIncluidos,
    };
  }
}
