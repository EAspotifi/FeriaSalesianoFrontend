import { createContext } from "react";
import type { HttpClient } from "../../../../shared/utils/httpClient";
import type { AuthSession } from "../../domain/entities/AuthSession";
import type { Credentials } from "../../domain/entities/Credentials";
import type { Registration } from "../../domain/entities/Registration";

export interface AuthContextValue {
  session: AuthSession | null;
  isAuthenticated: boolean;
  authenticatedHttp: HttpClient;
  login: (credentials: Credentials) => Promise<void>;
  register: (registration: Registration) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
