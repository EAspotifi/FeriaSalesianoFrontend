import type { HttpClient } from "../../../shared/utils/httpClient";
import type { Device, ManagedDevice } from "../domain/entities/Device";
import type { UserDevice } from "../domain/entities/UserDevice";
import type { DeviceRepository } from "../domain/ports/DeviceRepository";

interface DeviceDto {
  idDevice: string;
  nombre: string;
}

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

  async getAllDevices(): Promise<Device[]> {
    const dtos = await this.http.get<DeviceDto[]>("/devices");
    return dtos.map((dto) => ({ idDevice: dto.idDevice, nombre: dto.nombre }));
  }

  async getAssignments(): Promise<ManagedDevice[]> {
    const dtos = await this.http.get<UserDeviceDto[]>("/user-devices");
    return dtos.map((dto) => ({
      idDevice: dto.idDevice,
      nombre: dto.nombre,
      assignedTo: {
        id: dto.usuario.id,
        username: dto.usuario.username,
        nombre: dto.usuario.nombre,
      },
    }));
  }

  async createDevice(nombre: string): Promise<Device> {
    const dto = await this.http.post<DeviceDto>("/devices", { nombre });
    return { idDevice: dto.idDevice, nombre: dto.nombre };
  }

  async assignDevice(idDevice: string, userId: string): Promise<void> {
    await this.http.post("/devices/assign", { idDevice, userId });
  }

  async deleteDevice(idDevice: string): Promise<void> {
    await this.http.delete(`/devices/${idDevice}`);
  }
}
