import { useCallback, useEffect, useMemo, useState } from "react";
import { HttpError } from "../../../../shared/utils/httpClient";
import { useAuth } from "../../../auth/ui/hooks/useAuth";
import { createDeviceUseCases } from "../../di";
import type { ManagedDevice } from "../../domain/entities/Device";
import type { UserSummary } from "../../domain/entities/UserSummary";

function toMessage(err: unknown, fallback: string): string {
  return err instanceof HttpError ? err.message : fallback;
}

export function useManageDevices() {
  const { authenticatedHttp } = useAuth();
  const useCases = useMemo(() => createDeviceUseCases(authenticatedHttp), [authenticatedHttp]);

  const [devices, setDevices] = useState<ManagedDevice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const reload = useCallback(async () => {
    try {
      const next = await useCases.getManagedDevices.execute();
      setDevices(next);
      setError(null);
    } catch (err) {
      setError(toMessage(err, "No se pudieron cargar los dispositivos."));
    } finally {
      setIsLoading(false);
    }
  }, [useCases]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const createDevice = useCallback(
    async (nombre: string): Promise<boolean> => {
      setIsSaving(true);
      setMessage(null);
      try {
        const device = await useCases.createDevice.execute(nombre);
        setMessage(`Dispositivo "${device.nombre}" creado.`);
        setError(null);
        await reload();
        return true;
      } catch (err) {
        setError(toMessage(err, "No se pudo crear el dispositivo."));
        return false;
      } finally {
        setIsSaving(false);
      }
    },
    [useCases, reload],
  );

  const assignDevice = useCallback(
    async (idDevice: string, user: UserSummary): Promise<boolean> => {
      setIsSaving(true);
      setMessage(null);
      try {
        await useCases.assignDevice.execute(idDevice, user.id);
        setMessage(`Dispositivo asignado a ${user.nombre}.`);
        setError(null);
        await reload();
        return true;
      } catch (err) {
        setError(toMessage(err, "No se pudo asignar el dispositivo."));
        return false;
      } finally {
        setIsSaving(false);
      }
    },
    [useCases, reload],
  );

  const deleteDevice = useCallback(
    async (idDevice: string): Promise<boolean> => {
      setIsSaving(true);
      setMessage(null);
      try {
        await useCases.deleteDevice.execute(idDevice);
        setMessage("Dispositivo eliminado.");
        setError(null);
        await reload();
        return true;
      } catch (err) {
        setError(toMessage(err, "No se pudo eliminar el dispositivo."));
        return false;
      } finally {
        setIsSaving(false);
      }
    },
    [useCases, reload],
  );

  const searchUsers = useCallback(
    (query?: string) => useCases.searchUsers.execute(query),
    [useCases],
  );

  return {
    devices,
    isLoading,
    isSaving,
    error,
    message,
    createDevice,
    assignDevice,
    deleteDevice,
    searchUsers,
  };
}
