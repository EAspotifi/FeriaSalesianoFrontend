import { useCallback, useEffect, useMemo, useState } from "react";
import { HttpError } from "../../../../shared/utils/httpClient";
import { useAuth } from "../../../auth/ui/hooks/useAuth";
import { createMedicStatusUseCases } from "../../di";
import type { AggregateResult } from "../../domain/entities/AggregateResult";
import type { MedicStatus } from "../../domain/entities/MedicStatus";
import type { MedicStatusMedia } from "../../domain/entities/MedicStatusMedia";

interface UseHistoryResult {
  history: MedicStatus[];
  media: MedicStatusMedia[];
  isLoading: boolean;
  isAggregating: boolean;
  error: string | null;
  aggregateMessage: string | null;
  reload: () => Promise<void>;
  aggregate: () => Promise<void>;
}

export function useMedicStatusHistory(): UseHistoryResult {
  const { authenticatedHttp } = useAuth();
  const useCases = useMemo(
    () => createMedicStatusUseCases(authenticatedHttp),
    [authenticatedHttp],
  );
  const [history, setHistory] = useState<MedicStatus[]>([]);
  const [media, setMedia] = useState<MedicStatusMedia[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAggregating, setIsAggregating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aggregateMessage, setAggregateMessage] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [nextHistory, nextMedia] = await Promise.all([
        useCases.getMyHistory.execute(),
        useCases.getMyMedia.execute(),
      ]);
      setHistory(nextHistory);
      setMedia(nextMedia);
    } catch (err) {
      setError(err instanceof HttpError ? err.message : "No se pudo cargar el historial.");
    } finally {
      setIsLoading(false);
    }
  }, [useCases]);

  const aggregate = useCallback(async () => {
    setIsAggregating(true);
    setAggregateMessage(null);
    setError(null);
    try {
      const result: AggregateResult = await useCases.aggregate.execute();
      setAggregateMessage(
        `Promedio creado. Usuarios procesados: ${result.usuariosProcesados}.`,
      );
      await reload();
    } catch (err) {
      setError(err instanceof HttpError ? err.message : "No se pudo crear el promedio.");
    } finally {
      setIsAggregating(false);
    }
  }, [useCases, reload]);

  useEffect(() => {
    void reload();
  }, [reload]);

  return {
    history,
    media,
    isLoading,
    isAggregating,
    error,
    aggregateMessage,
    reload,
    aggregate,
  };
}
