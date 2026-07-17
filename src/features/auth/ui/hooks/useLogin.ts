import { useState } from "react";
import { HttpError } from "../../../../shared/utils/httpClient";
import type { Credentials } from "../../domain/entities/Credentials";
import { useAuth } from "./useAuth";

interface UseLoginResult {
  submit: (credentials: Credentials) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
  fieldErrors: Record<string, string[]>;
}

/** Hook de UI que orquesta el caso de uso de login y traduce errores a mensajes. */
export function useLogin(): UseLoginResult {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  async function submit(credentials: Credentials): Promise<boolean> {
    setIsLoading(true);
    setError(null);
    setFieldErrors({});
    try {
      await login(credentials);
      return true;
    } catch (err) {
      if (err instanceof HttpError) {
        if (err.validationErrors) {
          setFieldErrors(err.validationErrors);
          setError("Revisa los datos ingresados.");
        } else if (err.status === 401) {
          setError("Usuario o contraseña incorrectos.");
        } else {
          setError(err.message);
        }
      } else {
        setError("Ocurrió un error inesperado.");
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  return { submit, isLoading, error, fieldErrors };
}
