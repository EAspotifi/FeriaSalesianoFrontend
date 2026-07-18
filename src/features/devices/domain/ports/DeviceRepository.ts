import type { Device, ManagedDevice } from "../entities/Device";
import type { UserDevice } from "../entities/UserDevice";

export interface DeviceRepository {
  getMyDevices(): Promise<UserDevice[]>;
  getAllDevices(): Promise<Device[]>;
  getAssignments(): Promise<ManagedDevice[]>;
  createDevice(nombre: string): Promise<Device>;
  assignDevice(idDevice: string, userId: string): Promise<void>;
  deleteDevice(idDevice: string): Promise<void>;
}
