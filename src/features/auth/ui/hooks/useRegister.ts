import { useState } from "react";
import { HttpError } from "../../../../shared/utils/httpClient";
import type { Registration } from "../../domain/entities/Registration";
import { useAuth } from "./useAuth";

interface UseRegisterResult {
  submit: (registration: Registration) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
  fieldErrors: Record<string, string[]>;
}

/** Hook de UI que orquesta el caso de uso de registro y traduce errores a mensajes. */
export function useRegister(): UseRegisterResult {
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  async function submit(registration: Registration): Promise<boolean> {
    setIsLoading(true);
    setError(null);
    setFieldErrors({});
    try {
      await register(registration);
      return true;
    } catch (err) {
      if (err instanceof HttpError) {
        if (err.validationErrors) {
          setFieldErrors(err.validationErrors);
          setError("Revisa los datos ingresados.");
        } else if (err.status === 409) {
          setError(err.message || "El usuario o correo ya existe.");
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
