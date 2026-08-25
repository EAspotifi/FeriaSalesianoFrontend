import type { HttpClient } from "../../shared/utils/httpClient";
import { GetProfileUseCase } from "./application/GetProfileUseCase";
import { SendMedicReportUseCase } from "./application/SendMedicReportUseCase";
import { HttpProfileRepository } from "./infrastructure/HttpProfileRepository";

export function createProfileUseCases(http: HttpClient) {
  const repository = new HttpProfileRepository(http);
  return {
    getProfile: new GetProfileUseCase(repository),
    sendMedicReport: new SendMedicReportUseCase(repository),
  } as const;
}
