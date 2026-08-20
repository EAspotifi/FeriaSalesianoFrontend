import type { HttpClient } from "../../shared/utils/httpClient";
import {
  AddFamiliarUseCase,
  DeleteFamiliarUseCase,
  GetFamiliaresUseCase,
} from "./application/FamiliarUseCases";
import { HttpFamiliarRepository } from "./infrastructure/HttpFamiliarRepository";

export function createFamiliarUseCases(http: HttpClient) {
  const repository = new HttpFamiliarRepository(http);
  return {
    getFamiliares: new GetFamiliaresUseCase(repository),
    addFamiliar: new AddFamiliarUseCase(repository),
    deleteFamiliar: new DeleteFamiliarUseCase(repository),
  } as const;
}
