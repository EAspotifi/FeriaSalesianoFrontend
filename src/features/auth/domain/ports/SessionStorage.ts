import type { AuthSession } from "../entities/AuthSession";

/** Puerto de persistencia local de la sesión (token + usuario). */
export interface SessionStorage {
  save(session: AuthSession): void;
  get(): AuthSession | null;
  clear(): void;
}
