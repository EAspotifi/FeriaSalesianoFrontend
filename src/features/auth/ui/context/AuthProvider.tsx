import { useMemo, useRef, useState, type ReactNode } from "react";
import type { AuthSession } from "../../domain/entities/AuthSession";
import type { Credentials } from "../../domain/entities/Credentials";
import type { Registration } from "../../domain/entities/Registration";
import { createAuthUseCases } from "../../di";
import type { SessionListener } from "../../infrastructure/createAuthenticatedHttpClient";
import { AuthContext, type AuthContextValue } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const listenerRef = useRef<SessionListener>(() => {});
  const useCases = useMemo(
    () => createAuthUseCases((next) => listenerRef.current(next)),
    [],
  );
  const [session, setSession] = useState<AuthSession | null>(() =>
    useCases.getCurrentSession.execute(),
  );
  listenerRef.current = setSession;

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      isAuthenticated: session !== null,
      authenticatedHttp: useCases.authenticatedHttp,
      login: async (credentials: Credentials) => {
        const next = await useCases.login.execute(credentials);
        setSession(next);
      },
      register: async (registration: Registration) => {
        const next = await useCases.register.execute(registration);
        setSession(next);
      },
      logout: () => {
        useCases.logout.execute();
        setSession(null);
      },
    }),
    [session, useCases],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
