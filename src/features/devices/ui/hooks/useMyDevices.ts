import { useEffect, useMemo, useState } from "react";
import { HttpError } from "../../../../shared/utils/httpClient";
import { useAuth } from "../../../auth/ui/hooks/useAuth";
import { createDeviceUseCases } from "../../di";
import type { UserDevice } from "../../domain/entities/UserDevice";

export function useMyDevices() {
  const { authenticatedHttp } = useAuth();
  const useCases = useMemo(() => createDeviceUseCases(authenticatedHttp), [authenticatedHttp]);
  const [devices, setDevices] = useState<UserDevice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const next = await useCases.getMyDevices.execute();
        if (!cancelled) {
          setDevices(next);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof HttpError ? err.message : "No se pudieron cargar los dispositivos.");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [useCases]);

  return { devices, isLoading, error };
}
