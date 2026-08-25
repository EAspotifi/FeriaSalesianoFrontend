import { useMemo, useState } from "react";
import { HttpError } from "../../../../shared/utils/httpClient";
import { useAuth } from "../../../auth/ui/hooks/useAuth";
import { createProfileUseCases } from "../../di";
import type { MedicReportResult } from "../../domain/entities/MedicReportResult";

export function useSendMedicReport() {
  const { authenticatedHttp } = useAuth();
  const useCases = useMemo(() => createProfileUseCases(authenticatedHttp), [authenticatedHttp]);

  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MedicReportResult | null>(null);

  async function send(enviarFamiliares: boolean): Promise<boolean> {
    setIsSending(true);
    setError(null);
    setResult(null);
    try {
      const response = await useCases.sendMedicReport.execute(enviarFamiliares);
      setResult(response);
      return true;
    } catch (err) {
      setError(err instanceof HttpError ? err.message : "No se pudo enviar el informe.");
      return false;
    } finally {
      setIsSending(false);
    }
  }

  return { send, isSending, error, result };
}
