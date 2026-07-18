import { useState, type FormEvent } from "react";
import { AppShell } from "../../../app/layout/AppShell";
import { Button } from "../../../shared/ui/Button";
import type { ManagedDevice } from "../domain/entities/Device";
import { AssignDeviceDialog } from "./components/AssignDeviceDialog";
import { useManageDevices } from "./hooks/useManageDevices";

export function ManageDevicesPage() {
  const {
    devices,
    isLoading,
    isSaving,
    error,
    message,
    createDevice,
    assignDevice,
    deleteDevice,
    searchUsers,
  } = useManageDevices();

  const [newName, setNewName] = useState("");
  const [assigning, setAssigning] = useState<ManagedDevice | null>(null);

  async function handleCreate(event: FormEvent) {
    event.preventDefault();
    if (!newName.trim()) return;
    const ok = await createDevice(newName);
    if (ok) setNewName("");
  }

  function handleDelete(device: ManagedDevice) {
    if (window.confirm(`¿Eliminar el dispositivo "${device.nombre}"?`)) {
      void deleteDevice(device.idDevice);
    }
  }

  return (
    <AppShell title="Administrar dispositivos" showBack>
      {message && <p className="panel__success">{message}</p>}
      {error && <p className="login-form__error">{error}</p>}

      <section className="panel">
        <header className="panel__header">
          <div>
            <h2 className="panel__title">Crear dispositivo</h2>
            <p className="panel__subtitle">Registra un nuevo dispositivo en el sistema.</p>
          </div>
        </header>
        <form className="device-create" onSubmit={handleCreate}>
          <input
            className="field__input"
            type="text"
            placeholder="Nombre del dispositivo"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
          <Button type="submit" isLoading={isSaving} disabled={!newName.trim()}>
            Crear
          </Button>
        </form>
      </section>

      <section className="panel">
        <header className="panel__header">
          <div>
            <h2 className="panel__title">Dispositivos</h2>
            <p className="panel__subtitle">
              Asigna, reasigna o elimina dispositivos. Solo se pueden eliminar los que no
              están asignados.
            </p>
          </div>
        </header>

        {isLoading ? (
          <p className="panel__empty">Cargando dispositivos...</p>
        ) : devices.length === 0 ? (
          <p className="panel__empty">No hay dispositivos registrados.</p>
        ) : (
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>ID dispositivo</th>
                  <th>Asignado a</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {devices.map((device) => (
                  <tr key={device.idDevice}>
                    <td>{device.nombre}</td>
                    <td className="info-card__value--mono">{device.idDevice}</td>
                    <td>
                      {device.assignedTo ? (
                        device.assignedTo.nombre
                      ) : (
                        <span className="device-status--free">Libre</span>
                      )}
                    </td>
                    <td>
                      <div className="device-actions">
                        <button
                          type="button"
                          className="button button--outline"
                          disabled={isSaving}
                          onClick={() => setAssigning(device)}
                        >
                          {device.assignedTo ? "Reasignar" : "Asignar"}
                        </button>
                        <button
                          type="button"
                          className="button button--danger"
                          disabled={isSaving || device.assignedTo !== null}
                          title={
                            device.assignedTo
                              ? "No se puede eliminar un dispositivo asignado."
                              : undefined
                          }
                          onClick={() => handleDelete(device)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {assigning && (
        <AssignDeviceDialog
          device={assigning}
          isSaving={isSaving}
          onSearch={searchUsers}
          onAssign={(user) => assignDevice(assigning.idDevice, user)}
          onClose={() => setAssigning(null)}
        />
      )}
    </AppShell>
  );
}
