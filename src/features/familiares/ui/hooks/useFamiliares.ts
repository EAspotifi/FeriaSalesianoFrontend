import { useCallback, useEffect, useMemo, useState } from "react";
import { HttpError } from "../../../../shared/utils/httpClient";
import { useAuth } from "../../../auth/ui/hooks/useAuth";
import { createFamiliarUseCases } from "../../di";
import type { Familiar } from "../../domain/entities/Familiar";

export function useFamiliares() {
  const { authenticatedHttp } = useAuth();
  const useCases = useMemo(() => createFamiliarUseCases(authenticatedHttp), [authenticatedHttp]);

  const [familiares, setFamiliares] = useState<Familiar[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const items = await useCases.getFamiliares.execute();
      setFamiliares(items);
    } catch (err) {
      setError(err instanceof HttpError ? err.message : "No se pudieron cargar los familiares.");
    } finally {
      setIsLoading(false);
    }
  }, [useCases]);

  useEffect(() => {
    void load();
  }, [load]);

  async function add(emailFamiliar: string): Promise<boolean> {
    setIsSaving(true);
    setError(null);
    try {
      const created = await useCases.addFamiliar.execute(emailFamiliar);
      setFamiliares((prev) => [...prev, created].sort((a, b) => a.emailFamiliar.localeCompare(b.emailFamiliar)));
      return true;
    } catch (err) {
      if (err instanceof HttpError) {
        setError(err.message);
      } else {
        setError("No se pudo agregar el familiar.");
      }
      return false;
    } finally {
      setIsSaving(false);
    }
  }

  async function remove(idFamiliar: string): Promise<boolean> {
    setIsSaving(true);
    setError(null);
    try {
      await useCases.deleteFamiliar.execute(idFamiliar);
      setFamiliares((prev) => prev.filter((f) => f.idFamiliar !== idFamiliar));
      return true;
    } catch (err) {
      setError(err instanceof HttpError ? err.message : "No se pudo eliminar el familiar.");
      return false;
    } finally {
      setIsSaving(false);
    }
  }

  return { familiares, isLoading, isSaving, error, add, remove, reload: load };
}
