import { AppShell } from "../../../app/layout/AppShell";
import { useProfile } from "./hooks/useProfile";

export function ProfilePage() {
  const { profile, isLoading, error } = useProfile();

  return (
    <AppShell title="Mi perfil" showBack>
      {error && <p className="login-form__error">{error}</p>}
      {isLoading && <p className="panel__empty">Cargando perfil...</p>}

      {profile && (
        <section className="dashboard__cards">
          <article className="info-card">
            <span className="info-card__label">Usuario</span>
            <span className="info-card__value">{profile.username}</span>
          </article>
          <article className="info-card">
            <span className="info-card__label">Nombre</span>
            <span className="info-card__value">{profile.nombre}</span>
          </article>
          <article className="info-card">
            <span className="info-card__label">Correo</span>
            <span className="info-card__value">{profile.correo}</span>
          </article>
          <article className="info-card">
            <span className="info-card__label">Fecha de nacimiento</span>
            <span className="info-card__value">{profile.birth ?? "No registrada"}</span>
          </article>
        </section>
      )}
    </AppShell>
  );
}
