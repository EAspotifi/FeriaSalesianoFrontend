import type { AuthSession } from "../domain/entities/AuthSession";
import type { Registration } from "../domain/entities/Registration";
import type { AuthRepository } from "../domain/ports/AuthRepository";
import type { SessionStorage } from "../domain/ports/SessionStorage";

/** Caso de uso: registrar un usuario nuevo y persistir la sesión. */
export class RegisterUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly sessionStorage: SessionStorage,
  ) {}

  async execute(registration: Registration): Promise<AuthSession> {
    const session = await this.authRepository.register(registration);
    this.sessionStorage.save(session);
    return session;
  }
}
