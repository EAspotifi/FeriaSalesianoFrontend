import { useEffect, useState, type FormEvent } from "react";
import { Button } from "../../../../shared/ui/Button";
import type { ManagedDevice } from "../../domain/entities/Device";
import type { UserSummary } from "../../domain/entities/UserSummary";

interface AssignDeviceDialogProps {
  device: ManagedDevice;
  isSaving: boolean;
  onSearch: (query?: string) => Promise<UserSummary[]>;
  onAssign: (user: UserSummary) => Promise<boolean>;
  onClose: () => void;
}

export function AssignDeviceDialog({
  device,
  isSaving,
  onSearch,
  onAssign,
  onClose,
}: AssignDeviceDialogProps) {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<UserSummary[]>([]);
  const [isSearching, setIsSearching] = useState(true);
  const [searchError, setSearchError] = useState<string | null>(null);

  async function loadUsers(search?: string) {
    setIsSearching(true);
    try {
      setUsers(await onSearch(search));
      setSearchError(null);
    } catch {
      setSearchError("No se pudieron cargar los usuarios.");
    } finally {
      setIsSearching(false);
    }
  }

  useEffect(() => {
    void loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSearch(event: FormEvent) {
    event.preventDefault();
    void loadUsers(query);
  }

  async function handleAssign(user: UserSummary) {
    const ok = await onAssign(user);
    if (ok) onClose();
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <header className="modal__header">
          <h2 className="panel__title">
            {device.assignedTo ? "Reasignar" : "Asignar"} “{device.nombre}”
          </h2>
          {device.assignedTo && (
            <p className="panel__subtitle">
              Actualmente asignado a {device.assignedTo.nombre}.
            </p>
          )}
        </header>

        <form className="modal__search" onSubmit={handleSearch}>
          <input
            className="field__input"
            type="text"
            placeholder="Buscar por nombre o correo..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Button type="submit" isLoading={isSearching}>
            Buscar
          </Button>
        </form>

        {searchError && <p className="login-form__error">{searchError}</p>}

        {isSearching ? (
          <p className="panel__empty">Buscando usuarios...</p>
        ) : users.length === 0 ? (
          <p className="panel__empty">No se encontraron usuarios.</p>
        ) : (
          <ul className="user-list">
            {users.map((user) => (
              <li key={user.id} className="user-list__item">
                <div>
                  <p className="user-list__name">{user.nombre}</p>
                  <p className="user-list__email">{user.correo}</p>
                </div>
                <Button
                  type="button"
                  isLoading={isSaving}
                  onClick={() => void handleAssign(user)}
                >
                  Seleccionar
                </Button>
              </li>
            ))}
          </ul>
        )}

        <footer className="modal__footer">
          <button type="button" className="button button--outline" onClick={onClose}>
            Cancelar
          </button>
        </footer>
      </div>
    </div>
  );
}
