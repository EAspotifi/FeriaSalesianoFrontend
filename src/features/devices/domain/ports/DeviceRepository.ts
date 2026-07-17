import type { UserDevice } from "../entities/UserDevice";

export interface DeviceRepository {
  getMyDevices(): Promise<UserDevice[]>;
}
