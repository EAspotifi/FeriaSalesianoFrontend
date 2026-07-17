import { useEffect, useMemo, useState } from "react";
import { env } from "../../../../shared/config/env";
import { HttpError } from "../../../../shared/utils/httpClient";
import { useAuth } from "../../../auth/ui/hooks/useAuth";
import { createMedicStatusUseCases } from "../../di";
import type { MedicStatus } from "../../domain/entities/MedicStatus";

interface UseLastMedicStatusResult {
  data: MedicStatus | null;
  isLoading: boolean;
  error: string | null;
}

export function useLastMedicStatus(): UseLastMedicStatusResult {
  const { authenticatedHttp } = useAuth();
  const useCases = useMemo(
    () => createMedicStatusUseCases(authenticatedHttp),
    [authenticatedHttp],
  );
  const [data, setData] = useState<MedicStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchLast() {
      try {
        const next = await useCases.getLast.execute();
        if (cancelled) return;
        setData(next);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof HttpError ? err.message : "No se pudo cargar el último registro.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void fetchLast();
    const intervalId = window.setInterval(() => {
      void fetchLast();
    }, env.pollingIntervalMs);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, [useCases]);

  return { data, isLoading, error };
}
