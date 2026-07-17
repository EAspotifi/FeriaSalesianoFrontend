import type { AuthSession } from "../domain/entities/AuthSession";
import type { AuthRepository } from "../domain/ports/AuthRepository";
import type { SessionStorage } from "../domain/ports/SessionStorage";

/** Caso de uso: renovar access token y persistir la nueva sesión. */
export class RefreshTokenUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly sessionStorage: SessionStorage,
  ) {}

  async execute(refreshToken: string): Promise<AuthSession> {
    const session = await this.authRepository.refresh(refreshToken);
    const current = this.sessionStorage.get();
    const merged: AuthSession = {
      ...session,
      user: {
        ...session.user,
        correo: current?.user.correo ?? session.user.correo,
      },
    };
    this.sessionStorage.save(merged);
    return merged;
  }
}
