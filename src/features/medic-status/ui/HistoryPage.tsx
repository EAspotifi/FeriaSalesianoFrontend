import { AppShell } from "../../../app/layout/AppShell";
import { Button } from "../../../shared/ui/Button";
import { formatDateTime, formatMetric } from "../../../shared/utils/format";
import { useMedicStatusHistory } from "./hooks/useMedicStatusHistory";

export function HistoryPage() {
  const {
    history,
    media,
    isLoading,
    isAggregating,
    error,
    aggregateMessage,
    aggregate,
  } = useMedicStatusHistory();

  return (
    <AppShell title="Historial" showBack>
      <section className="panel">
        <header className="panel__header">
          <div>
            <h2 className="panel__title">Histórico</h2>
            <p className="panel__subtitle">Registros crudos de signos vitales.</p>
          </div>
        </header>

        {isLoading ? (
          <p className="panel__empty">Cargando...</p>
        ) : history.length === 0 ? (
          <p className="panel__empty">No hay registros en el historial.</p>
        ) : (
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>RPM</th>
                  <th>TMP</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item.id}>
                    <td>{formatMetric(item.rpm)}</td>
                    <td>{formatMetric(item.tmp)}</td>
                    <td>{formatDateTime(item.created)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="panel">
        <header className="panel__header">
          <div>
            <h2 className="panel__title">Promedios</h2>
            <p className="panel__subtitle">Promedios diarios almacenados.</p>
          </div>
          <Button type="button" isLoading={isAggregating} onClick={() => void aggregate()}>
            Crear promedio y limpiar historial
          </Button>
        </header>

        {aggregateMessage && <p className="panel__success">{aggregateMessage}</p>}
        {error && <p className="login-form__error">{error}</p>}

        {isLoading ? (
          <p className="panel__empty">Cargando...</p>
        ) : media.length === 0 ? (
          <p className="panel__empty">No hay promedios registrados.</p>
        ) : (
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>RPM</th>
                  <th>TMP</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {media.map((item) => (
                  <tr key={item.id}>
                    <td>{formatMetric(item.rpm)}</td>
                    <td>{formatMetric(item.tmp)}</td>
                    <td>{formatDateTime(item.created)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </AppShell>
  );
}
