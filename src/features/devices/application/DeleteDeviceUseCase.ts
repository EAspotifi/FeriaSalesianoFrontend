import type { DeviceRepository } from "../domain/ports/DeviceRepository";

/** Elimina un dispositivo; el backend rechaza la operación si está asignado. */
export class DeleteDeviceUseCase {
  constructor(private readonly repository: DeviceRepository) {}

  execute(idDevice: string): Promise<void> {
    return this.repository.deleteDevice(idDevice);
  }
}
