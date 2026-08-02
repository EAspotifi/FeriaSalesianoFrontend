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
  historyPage: number;
  mediaPage: number;
  historyTotalPages: number;
  mediaTotalPages: number;
  fromDate: string;
  toDate: string;
  isLoading: boolean;
  isAggregating: boolean;
  error: string | null;
  aggregateMessage: string | null;
  setFromDate: (value: string) => void;
  setToDate: (value: string) => void;
  setHistoryPage: (page: number) => void;
  setMediaPage: (page: number) => void;
  reload: () => Promise<void>;
  aggregate: () => Promise<void>;
}

const PAGE_SIZE = 10;

export function useMedicStatusHistory(): UseHistoryResult {
  const { authenticatedHttp } = useAuth();
  const useCases = useMemo(
    () => createMedicStatusUseCases(authenticatedHttp),
    [authenticatedHttp],
  );
  const [history, setHistory] = useState<MedicStatus[]>([]);
  const [media, setMedia] = useState<MedicStatusMedia[]>([]);
  const [historyPage, setHistoryPage] = useState(1);
  const [mediaPage, setMediaPage] = useState(1);
  const [historyTotalPages, setHistoryTotalPages] = useState(1);
  const [mediaTotalPages, setMediaTotalPages] = useState(1);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAggregating, setIsAggregating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aggregateMessage, setAggregateMessage] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const queryBase = {
        pageSize: PAGE_SIZE,
        fromDate: fromDate || undefined,
        toDate: toDate || undefined,
      };
      const [nextHistory, nextMedia] = await Promise.all([
        useCases.getMyHistory.execute({ ...queryBase, page: historyPage }),
        useCases.getMyMedia.execute({ ...queryBase, page: mediaPage }),
      ]);
      setHistory(nextHistory.items);
      setMedia(nextMedia.items);
      setHistoryTotalPages(Math.max(1, nextHistory.totalPages));
      setMediaTotalPages(Math.max(1, nextMedia.totalPages));
    } catch (err) {
      setError(err instanceof HttpError ? err.message : "No se pudo cargar el historial.");
    } finally {
      setIsLoading(false);
    }
  }, [useCases, historyPage, mediaPage, fromDate, toDate]);

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
    historyPage,
    mediaPage,
    historyTotalPages,
    mediaTotalPages,
    fromDate,
    toDate,
    isLoading,
    isAggregating,
    error,
    aggregateMessage,
    setFromDate: (value) => {
      setHistoryPage(1);
      setMediaPage(1);
      setFromDate(value);
    },
    setToDate: (value) => {
      setHistoryPage(1);
      setMediaPage(1);
      setToDate(value);
    },
    setHistoryPage,
    setMediaPage,
    reload,
    aggregate,
  };
}
