import type { UserDevice } from "../domain/entities/UserDevice";
import type { DeviceRepository } from "../domain/ports/DeviceRepository";

export class GetMyDevicesUseCase {
  constructor(private readonly repository: DeviceRepository) {}

  execute(): Promise<UserDevice[]> {
    return this.repository.getMyDevices();
  }
}
