import { Link } from "react-router-dom";
import { AppShell } from "../../../app/layout/AppShell";
import { formatDateTime, formatMetric } from "../../../shared/utils/format";
import { useAuth } from "../../auth/ui/hooks/useAuth";
import { useLastMedicStatus } from "../../medic-status/ui/hooks/useLastMedicStatus";

export function DashboardPage() {
  const { session } = useAuth();
  const { data, isLoading, error } = useLastMedicStatus();
  const user = session?.user;

  return (
    <AppShell>
      <div className="dashboard__welcome">
        <h1>Hola, {user?.nombre ?? user?.username}</h1>
        <p>Panel de monitoreo médico en tiempo real.</p>
      </div>

      <div className="dashboard__toolbar">
        <Link to="/history" className="button button--outline">
          Ver historial
        </Link>
        <Link to="/profile" className="button button--outline">
          Mi perfil
        </Link>
        <Link to="/devices" className="button button--outline">
          Mis dispositivos
        </Link>
      </div>

      {error && <p className="login-form__error">{error}</p>}

      <section className="metric-cards">
        <article className="metric-card">
          <span className="metric-card__label">BPM</span>
          <span className="metric-card__value">
            {isLoading && !data ? "—" : data ? formatMetric(data.bpm) : "Sin datos"}
          </span>
          {data && <span className="metric-card__state">{data.estadoBpm}</span>}
        </article>
        <article className="metric-card">
          <span className="metric-card__label">SpO₂</span>
          <span className="metric-card__value">
            {isLoading && !data
              ? "—"
              : data
                ? `${formatMetric(data.spo2)} %`
                : "Sin datos"}
          </span>
          {data && <span className="metric-card__state">{data.estadoSpo2}</span>}
        </article>
        <article className="metric-card">
          <span className="metric-card__label">Temperatura</span>
          <span className="metric-card__value">
            {isLoading && !data
              ? "—"
              : data
                ? `${formatMetric(data.temperature)} °C`
                : "Sin datos"}
          </span>
          {data && <span className="metric-card__state">{data.estadoTemperature}</span>}
        </article>
      </section>

      <p className="dashboard__note">
        Este fue el último dato registrado
        {data?.created ? ` (${formatDateTime(data.created)}).` : "."}
      </p>
    </AppShell>
  );
}
