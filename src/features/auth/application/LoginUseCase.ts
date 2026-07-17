import type { AuthSession } from "../domain/entities/AuthSession";
import type { Credentials } from "../domain/entities/Credentials";
import type { AuthRepository } from "../domain/ports/AuthRepository";
import type { SessionStorage } from "../domain/ports/SessionStorage";

/** Caso de uso: autenticar al usuario y persistir la sesión. */
export class LoginUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly sessionStorage: SessionStorage,
  ) {}

  async execute(credentials: Credentials): Promise<AuthSession> {
    const session = await this.authRepository.login(credentials);
    this.sessionStorage.save(session);
    return session;
  }
}
