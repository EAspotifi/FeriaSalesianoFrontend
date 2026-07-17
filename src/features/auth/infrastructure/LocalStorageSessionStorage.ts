import type { AuthSession } from "../domain/entities/AuthSession";
import type { SessionStorage } from "../domain/ports/SessionStorage";

const STORAGE_KEY = "feria-salesiano.session:v1";

/** Adaptador de persistencia de sesión sobre localStorage. */
export class LocalStorageSessionStorage implements SessionStorage {
  save(session: AuthSession): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }

  get(): AuthSession | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthSession;
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  }

  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}
