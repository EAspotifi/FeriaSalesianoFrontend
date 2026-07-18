import type { DeviceRepository } from "../domain/ports/DeviceRepository";

/** Asigna un dispositivo; si ya estaba asignado, el backend lo reasigna. */
export class AssignDeviceUseCase {
  constructor(private readonly repository: DeviceRepository) {}

  execute(idDevice: string, userId: string): Promise<void> {
    return this.repository.assignDevice(idDevice, userId);
  }
}
