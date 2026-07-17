import { useEffect, useMemo, useState } from "react";
import { HttpError } from "../../../../shared/utils/httpClient";
import { useAuth } from "../../../auth/ui/hooks/useAuth";
import { createProfileUseCases } from "../../di";
import type { UserProfile } from "../../domain/entities/UserProfile";

export function useProfile() {
  const { authenticatedHttp } = useAuth();
  const useCases = useMemo(() => createProfileUseCases(authenticatedHttp), [authenticatedHttp]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const next = await useCases.getProfile.execute();
        if (!cancelled) {
          setProfile(next);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof HttpError ? err.message : "No se pudo cargar el perfil.");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [useCases]);

  return { profile, isLoading, error };
}
