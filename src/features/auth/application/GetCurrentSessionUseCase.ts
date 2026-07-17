import type { AuthSession } from "../domain/entities/AuthSession";
import type { SessionStorage } from "../domain/ports/SessionStorage";

/** Caso de uso: recuperar la sesión persistida (al iniciar la app). */
export class GetCurrentSessionUseCase {
  constructor(private readonly sessionStorage: SessionStorage) {}

  execute(): AuthSession | null {
    return this.sessionStorage.get();
  }
}
