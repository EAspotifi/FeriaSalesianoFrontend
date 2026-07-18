import type { Device } from "../domain/entities/Device";
import type { DeviceRepository } from "../domain/ports/DeviceRepository";

export class CreateDeviceUseCase {
  constructor(private readonly repository: DeviceRepository) {}

  execute(nombre: string): Promise<Device> {
    return this.repository.createDevice(nombre.trim());
  }
}
