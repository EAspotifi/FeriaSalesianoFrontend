import type { SessionStorage } from "../domain/ports/SessionStorage";

/** Caso de uso: cerrar sesión limpiando la sesión local. */
export class LogoutUseCase {
  constructor(private readonly sessionStorage: SessionStorage) {}

  execute(): void {
    this.sessionStorage.clear();
  }
}
