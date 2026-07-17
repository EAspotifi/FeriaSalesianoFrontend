import { FetchHttpClient } from "../../shared/utils/httpClient";
import { GetCurrentSessionUseCase } from "./application/GetCurrentSessionUseCase";
import { LoginUseCase } from "./application/LoginUseCase";
import { LogoutUseCase } from "./application/LogoutUseCase";
import { RefreshTokenUseCase } from "./application/RefreshTokenUseCase";
import { RegisterUseCase } from "./application/RegisterUseCase";
import {
  createAuthenticatedHttpClient,
  createSessionStorage,
  type SessionListener,
} from "./infrastructure/createAuthenticatedHttpClient";
import { HttpAuthRepository } from "./infrastructure/HttpAuthRepository";

/**
 * Composición manual de la feature auth (Dependency Injection).
 */
export function createAuthUseCases(onSessionChange?: SessionListener) {
  const sessionStorage = createSessionStorage();
  const publicHttp = new FetchHttpClient();
  const authRepository = new HttpAuthRepository(publicHttp);
  const authenticatedHttp = createAuthenticatedHttpClient(sessionStorage, onSessionChange);

  return {
    login: new LoginUseCase(authRepository, sessionStorage),
    register: new RegisterUseCase(authRepository, sessionStorage),
    logout: new LogoutUseCase(sessionStorage),
    getCurrentSession: new GetCurrentSessionUseCase(sessionStorage),
    refresh: new RefreshTokenUseCase(authRepository, sessionStorage),
    sessionStorage,
    authenticatedHttp,
  } as const;
}

export type AuthUseCases = ReturnType<typeof createAuthUseCases>;
