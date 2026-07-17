import type { HttpClient } from "../../../shared/utils/httpClient";
import type { UserDevice } from "../domain/entities/UserDevice";
import type { DeviceRepository } from "../domain/ports/DeviceRepository";

interface UserDeviceDto {
  idDevice: string;
  nombre: string;
  usuario: { id: string; username: string; nombre: string };
}

export class HttpDeviceRepository implements DeviceRepository {
  constructor(private readonly http: HttpClient) {}

  async getMyDevices(): Promise<UserDevice[]> {
    const dtos = await this.http.get<UserDeviceDto[]>("/user-devices/me");
    return dtos.map((dto) => ({
      idDevice: dto.idDevice,
      nombre: dto.nombre,
      usuario: {
        id: dto.usuario.id,
        username: dto.usuario.username,
        nombre: dto.usuario.nombre,
      },
    }));
  }
}
