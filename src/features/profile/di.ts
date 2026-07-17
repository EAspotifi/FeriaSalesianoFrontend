import type { HttpClient } from "../../shared/utils/httpClient";
import { GetProfileUseCase } from "./application/GetProfileUseCase";
import { HttpProfileRepository } from "./infrastructure/HttpProfileRepository";

export function createProfileUseCases(http: HttpClient) {
  return {
    getProfile: new GetProfileUseCase(new HttpProfileRepository(http)),
  } as const;
}
