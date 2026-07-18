import type { ManagedDevice } from "../domain/entities/Device";
import type { DeviceRepository } from "../domain/ports/DeviceRepository";

/** Combina el catálogo de dispositivos con las asignaciones actuales. */
export class GetManagedDevicesUseCase {
  constructor(private readonly repository: DeviceRepository) {}

  async execute(): Promise<ManagedDevice[]> {
    const [devices, assignments] = await Promise.all([
      this.repository.getAllDevices(),
      this.repository.getAssignments(),
    ]);

    const assignmentByDevice = new Map(assignments.map((a) => [a.idDevice, a.assignedTo]));

    return devices.map((device) => ({
      idDevice: device.idDevice,
      nombre: device.nombre,
      assignedTo: assignmentByDevice.get(device.idDevice) ?? null,
    }));
  }
}
