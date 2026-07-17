import type { AuthSession } from "../entities/AuthSession";
import type { Credentials } from "../entities/Credentials";
import type { Registration } from "../entities/Registration";
import type { User } from "../entities/User";

/**
 * Puerto de acceso a la autenticación. La UI y los casos de uso dependen
 * de esta interfaz, nunca de una implementación concreta (HTTP, mock, etc.).
 */
export interface AuthRepository {
  login(credentials: Credentials): Promise<AuthSession>;
  register(registration: Registration): Promise<AuthSession>;
  refresh(refreshToken: string): Promise<AuthSession>;
  getProfile(token: string): Promise<User>;
}
