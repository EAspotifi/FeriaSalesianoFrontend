import type { HttpClient } from "../../shared/utils/httpClient";
import { GetMyDevicesUseCase } from "./application/GetMyDevicesUseCase";
import { HttpDeviceRepository } from "./infrastructure/HttpDeviceRepository";

export function createDeviceUseCases(http: HttpClient) {
  return {
    getMyDevices: new GetMyDevicesUseCase(new HttpDeviceRepository(http)),
  } as const;
}
