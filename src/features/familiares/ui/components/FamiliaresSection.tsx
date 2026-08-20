import { useState, type FormEvent } from "react";
import { Button } from "../../../../shared/ui/Button";
import { TextField } from "../../../../shared/ui/TextField";
import { useFamiliares } from "../hooks/useFamiliares";

export function FamiliaresSection() {
  const { familiares, isLoading, isSaving, error, add, remove } = useFamiliares();
  const [email, setEmail] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    const ok = await add(trimmed);
    if (ok) setEmail("");
  }

  return (
    <section className="panel">
      <header className="panel__header">
        <h2 className="panel__title">Familiares para alertas</h2>
        <p className="panel__subtitle">
          Recibirán un correo si se detectan signos vitales graves en la última hora.
        </p>
      </header>

      {error && <p className="login-form__error">{error}</p>}

      <form className="familiar-form" onSubmit={handleSubmit}>
        <TextField
          label="Correo del familiar"
          name="emailFamiliar"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          placeholder="familiar@ejemplo.com"
        />
        <Button type="submit" isLoading={isSaving}>
          Agregar familiar
        </Button>
      </form>

      {isLoading && <p className="panel__empty">Cargando familiares...</p>}

      {!isLoading && familiares.length === 0 && (
        <p className="panel__empty">Aún no has registrado familiares.</p>
      )}

      {familiares.length > 0 && (
        <ul className="familiar-list">
          {familiares.map((familiar) => (
            <li key={familiar.idFamiliar} className="familiar-list__item">
              <span>{familiar.emailFamiliar}</span>
              <Button
                type="button"
                isLoading={isSaving}
                onClick={() => void remove(familiar.idFamiliar)}
              >
                Eliminar
              </Button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
