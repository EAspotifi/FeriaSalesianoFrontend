import type { HttpClient } from "../../shared/utils/httpClient";
import { AggregateMedicStatusUseCase } from "./application/AggregateMedicStatusUseCase";
import { GetLastMedicStatusUseCase } from "./application/GetLastMedicStatusUseCase";
import { GetMyMedicStatusHistoryUseCase } from "./application/GetMyMedicStatusHistoryUseCase";
import { GetMyMedicStatusMediaUseCase } from "./application/GetMyMedicStatusMediaUseCase";
import { HttpMedicStatusRepository } from "./infrastructure/HttpMedicStatusRepository";

export function createMedicStatusUseCases(http: HttpClient) {
  const repository = new HttpMedicStatusRepository(http);
  return {
    getLast: new GetLastMedicStatusUseCase(repository),
    getMyHistory: new GetMyMedicStatusHistoryUseCase(repository),
    getMyMedia: new GetMyMedicStatusMediaUseCase(repository),
    aggregate: new AggregateMedicStatusUseCase(repository),
  } as const;
}

export type MedicStatusUseCases = ReturnType<typeof createMedicStatusUseCases>;
