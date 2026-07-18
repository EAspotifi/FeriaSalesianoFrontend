import type { HttpClient } from "../../shared/utils/httpClient";
import { AssignDeviceUseCase } from "./application/AssignDeviceUseCase";
import { CreateDeviceUseCase } from "./application/CreateDeviceUseCase";
import { DeleteDeviceUseCase } from "./application/DeleteDeviceUseCase";
import { GetManagedDevicesUseCase } from "./application/GetManagedDevicesUseCase";
import { GetMyDevicesUseCase } from "./application/GetMyDevicesUseCase";
import { SearchUsersUseCase } from "./application/SearchUsersUseCase";
import { HttpDeviceRepository } from "./infrastructure/HttpDeviceRepository";
import { HttpUserDirectory } from "./infrastructure/HttpUserDirectory";

export function createDeviceUseCases(http: HttpClient) {
  const repository = new HttpDeviceRepository(http);
  const userDirectory = new HttpUserDirectory(http);

  return {
    getMyDevices: new GetMyDevicesUseCase(repository),
    getManagedDevices: new GetManagedDevicesUseCase(repository),
    createDevice: new CreateDeviceUseCase(repository),
    assignDevice: new AssignDeviceUseCase(repository),
    deleteDevice: new DeleteDeviceUseCase(repository),
    searchUsers: new SearchUsersUseCase(userDirectory),
  } as const;
}
