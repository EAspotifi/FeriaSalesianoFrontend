import { AppShell } from "../../../app/layout/AppShell";
import { useMyDevices } from "./hooks/useMyDevices";

export function DevicesPage() {
  const { devices, isLoading, error } = useMyDevices();

  return (
    <AppShell title="Mis dispositivos" showBack>
      {error && <p className="login-form__error">{error}</p>}
      {isLoading && <p className="panel__empty">Cargando dispositivos...</p>}

      {!isLoading && devices.length === 0 && (
        <p className="panel__empty">No tienes dispositivos asignados.</p>
      )}

      {devices.length > 0 && (
        <div className="data-table-wrap">
          <table className="data-table data-table--stack">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>ID dispositivo</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device) => (
                <tr key={device.idDevice}>
                  <td data-label="Nombre">{device.nombre}</td>
                  <td data-label="ID dispositivo" className="info-card__value--mono">
                    {device.idDevice}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AppShell>
  );
}
