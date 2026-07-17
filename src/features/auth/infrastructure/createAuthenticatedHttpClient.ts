import {
  FetchHttpClient,
  type AuthHttpHooks,
  type HttpClient,
  type TokenRefreshResult,
} from "../../../shared/utils/httpClient";
import { RefreshTokenUseCase } from "../application/RefreshTokenUseCase";
import type { AuthSession } from "../domain/entities/AuthSession";
import type { SessionStorage } from "../domain/ports/SessionStorage";
import { HttpAuthRepository } from "../infrastructure/HttpAuthRepository";
import { LocalStorageSessionStorage } from "../infrastructure/LocalStorageSessionStorage";

export type SessionListener = (session: AuthSession | null) => void;

/**
 * Fábrica del cliente HTTP autenticado con refresh automático.
 * Usada por el AuthProvider y por el resto de features.
 */
export function createAuthenticatedHttpClient(
  sessionStorage: SessionStorage = new LocalStorageSessionStorage(),
  onSessionChange?: SessionListener,
): HttpClient {
  const publicHttp = new FetchHttpClient();
  const authRepository = new HttpAuthRepository(publicHttp);
  const refreshUseCase = new RefreshTokenUseCase(authRepository, sessionStorage);

  const hooks: AuthHttpHooks = {
    getAccessToken: () => sessionStorage.get()?.token ?? null,
    getRefreshToken: () => sessionStorage.get()?.refreshToken ?? null,
    refresh: async (refreshToken: string) => {
      const session = await refreshUseCase.execute(refreshToken);
      return { token: session.token, refreshToken: session.refreshToken };
    },
    onSessionRefreshed: (tokens: TokenRefreshResult) => {
      const current = sessionStorage.get();
      if (!current) return;
      const next: AuthSession = {
        ...current,
        token: tokens.token,
        refreshToken: tokens.refreshToken,
      };
      sessionStorage.save(next);
      onSessionChange?.(next);
    },
    onSessionExpired: () => {
      sessionStorage.clear();
      onSessionChange?.(null);
    },
  };

  return new FetchHttpClient(undefined, () => sessionStorage.get()?.token ?? null, hooks);
}

export function createSessionStorage(): SessionStorage {
  return new LocalStorageSessionStorage();
}
